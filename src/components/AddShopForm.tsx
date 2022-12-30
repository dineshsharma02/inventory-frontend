import { Form, Input, Button, Modal, Select, notification } from "antd";
import React, { useState } from "react";
import { axiosRequest,  } from "../utils/functions";
import { createUserUrl, ShopUrl } from "../utils/network";
import { DataProps, FormModalProps } from "../utils/types";

const { Option } = Select;



const AddShopForm = ({
  isVisible,
  onSuccessCallBack,
  onClose,
}: FormModalProps) => {


  const [form] = Form.useForm(); 
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: DataProps) => {
    setLoading(true);

    const response = await axiosRequest({
      method:"post",
      url: ShopUrl,
      hasAuth:true,
      payload: values,

    })

    setLoading(false)

    if (response) {
      onSuccessCallBack();
      notification.success({
        message: "Operation Success",
        description: "Shop Created Successfully",
      });
      setLoading(false);
      onClose();
      form.resetFields()
    }

    return null;
  };

  return (
    <Modal title="Add Shop" open={isVisible} onCancel={onClose} footer={false}>
      <Form layout="vertical" autoComplete="off" onFinish={onSubmit} form={form}>
        

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your shop name" }]}
        >
          <Input placeholder="Shop Name" type="text" />
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

export default AddShopForm;
