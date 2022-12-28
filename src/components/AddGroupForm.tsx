import { Form, Input, Button, Modal, Select, notification } from "antd";
import React, { useState } from "react";
import { axiosRequest,  } from "../utils/functions";
import { createUserUrl, GroupUrl } from "../utils/network";
import { DataProps, FormModalProps, GroupProps } from "../utils/types";

const { Option } = Select;

interface AddGroupFormProps extends FormModalProps {
  groups: GroupProps[]  
}


const AddGroupForm = ({
  isVisible,
  onSuccessCallBack,
  onClose,
  groups,
}: AddGroupFormProps) => {


  const [form] = Form.useForm(); 
  const [loading, setLoading] = useState(false);

  // const options = groups.map(item => {
  //                   "value":item.id,
  //                   "label": item.name;
  //                 })

  const onSubmit = async (values: DataProps) => {
    setLoading(true);

    const response = await axiosRequest({
      method:"post",
      url: GroupUrl,
      hasAuth:true,
      payload: values,

    })

    setLoading(false)

    if (response) {
      onSuccessCallBack();
      notification.success({
        message: "Operation Success",
        description: "Group Created Successfully",
      });
      setLoading(false);
      onClose();
      form.resetFields()
    }

    return null;
  };

  return (
    <Modal title="Add Group" open={isVisible} onCancel={onClose} footer={false}>
      <Form layout="vertical" autoComplete="off" onFinish={onSubmit} form={form}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input group name!" }]}
        >
          <Input placeholder="Group Name"  />
        </Form.Item>

      

        <Form.Item
          label="Belongs To"
          name="belongs_to_id"

        >
          <Select defaultValue=""
            placeholder="Select a group"
            

            options = {groups.map((item,index)=> ({value:item.id,label:item.name,key:index}))}
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

export default AddGroupForm;
