import { Form, Input, Button, Modal, Select, notification } from "antd";
import React, { ChangeEvent, useRef, useState } from "react";
import { axiosRequest } from "../utils/functions";
import { CloudinaryUrl, createUserUrl, GroupUrl, InventoryUrl } from "../utils/network";
import { DataProps, FormModalProps, GroupProps } from "../utils/types";

const { Option } = Select;

const ImageHolder = require("../assets/imageHolder.png") as string;
interface AddInventoryFormProps extends FormModalProps {
  groups: GroupProps[];
  
}

const AddInventoryForm = ({
  isVisible,
  onSuccessCallBack,
  onClose,
  groups,
}: AddInventoryFormProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>()
  const fileSelect = useRef<HTMLInputElement>(null);

  // const options = groups.map(item => {
  //                   "value":item.id,
  //                   "label": item.name;
  //                 })

  const onSubmit = async (values: DataProps) => {

    setLoading(true);

    if (imageUrl){
      values = {...values, photo:imageUrl}
    }

    const response = await axiosRequest({
      method: "post",
      url: InventoryUrl,
      hasAuth: true,
      payload: values,
    });

    setLoading(false);

    if (response) {
      onSuccessCallBack();
      notification.success({
        message: "Operation Success",
        description: "Inventory Item Created Successfully",
      });
      setLoading(false);
      onClose();
      form.resetFields();
      setImageUrl(null)
    }

    return null;
  };

  const handleFileChange = async (e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const formItem = new FormData()
      formItem.append("file",e.target.files[0])
      formItem.append("upload_preset","inventory_app")
      formItem.append("tags","inventory_app")

      setLoading(true);

    const response = await axiosRequest<{url:string}>({
      method: "post",
      url: CloudinaryUrl,
      hasAuth: false,
      payload: formItem,
    })

    setLoading(false)
    if (response){
      setImageUrl(response.data.url);
      
    }
      
      
    }
  }

  return (
    <Modal title="Add Group" open={isVisible} onCancel={onClose} footer={false}>
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label="Item Photo"
          name="item_photo"
          rules={[{ required: false, message: "Please input group name!" }]}
        >
          <div
            className="imageView"
            onClick={() => !loading && fileSelect.current?.click()}
            style = {{
              backgroundImage: `url(${imageUrl? imageUrl: ImageHolder})`
            }}
          />
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileSelect}
            onChange={handleFileChange}
          />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input group name!" }]}
        >
          <Input placeholder="Item Name" />
        </Form.Item>

        <Form.Item
          label="Count"
          name="total"
          rules={[{ required: true, message: "Please input item count!" }]}
        >
          <Input placeholder="Item Count" type="number" min={1} />
        </Form.Item>

        <Form.Item
          label="Item Price"
          name="price"
          rules={[{ required: true, message: "Please input item price!" }]}
        >
          <Input placeholder="Item Count" type="number" min={1} />
        </Form.Item>

        <Form.Item label="Group/ Category" name="group_id">
          <Select
            defaultValue=""
            placeholder="Select a group"
            options={groups.map((item, index) => ({
              value: item.id,
              label: item.name,
              key: index,
            }))}
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

export default AddInventoryForm;
