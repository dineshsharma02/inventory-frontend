import { Form, Input, Button, Modal, Select, notification } from "antd";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { getAuthToken } from "../utils/functions";
import { createUserUrl } from "../utils/network";
import { AuthTokenType, DataProps } from "../utils/types";

const { Option } = Select;

interface AddUserFormProps {
  isVisible?: boolean;
  onSuccessCallBack: () => void;
  onClose: () => void;
}

const AddUserForm = ({
  isVisible,
  onSuccessCallBack,
  onClose,
}: AddUserFormProps) => {


  const [form] = Form.useForm(); 
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: DataProps) => {
    setLoading(true);
    const headers = getAuthToken() as AuthTokenType;

    const response: AxiosResponse = (await axios
      .post(createUserUrl, values, headers)
      .catch((e) => {
        notification.error({
          message: "Operation Error",
          description: e.response?.data.error,
        });
        onClose();
        setLoading(false);
      })) as AxiosResponse;

    if (response) {
      onSuccessCallBack();
      notification.success({
        message: "Operation Success",
        description: "User Created Successfully",
      });
      setLoading(false);
      onClose();
      form.resetFields()
    }

    return null;
  };

  return (
    <Modal title="Add User" open={isVisible} onCancel={onClose} footer={false}>
      <Form layout="vertical" autoComplete="off" onFinish={onSubmit} form={form}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email" }]}
        >
          <Input placeholder="abc@gmail.com" type="email" />
        </Form.Item>

        <Form.Item
          label="Name"
          name="fullname"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input placeholder="John Doe" type="text" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select
            placeholder="Role"
            options={[
              {
                value: "admin",
                label: "Admin",
              },
              {
                value: "creator",
                label: "Creator",
              },

              {
                value: "sale",
                label: "Sale",
              },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" block loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserForm;
