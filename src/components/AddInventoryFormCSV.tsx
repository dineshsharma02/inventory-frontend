import { Form, Button, Modal, notification } from "antd";
import  { ChangeEvent, useRef, useState } from "react";
import { axiosRequest } from "../utils/functions";
import {
  CloudinaryUrl,
  InventoryCSVUrl,
  InventoryUrl,
} from "../utils/network";
import { DataProps, FormModalProps } from "../utils/types";

const AddInventoryFormCSV = ({
  isVisible,
  onSuccessCallBack,
  onClose,
}: FormModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState<File | null>(null)
  const fileSelect = useRef<HTMLInputElement>(null);

  const onSubmit = async (values: DataProps) => {
    setLoading(true);

    if (!csvData) return

    const formItem = new FormData();
    formItem.append("data",csvData);

    const response = await axiosRequest({
      method: "post",
      url: InventoryCSVUrl,
      hasAuth: true,
      payload: formItem,
    });

    setLoading(false);

    if (response) {
      onSuccessCallBack();
      notification.success({
        message: "Operation Success",
        description: "Inventory Items Added Successfully",
      });
      setLoading(false);
      onClose();
      form.resetFields();
    }

    return null;
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCsvData(e.target.files[0])
    }
  };

  return (
    <Modal
      title="Add Inventory Items (CSV)"
      open={isVisible}
      onCancel={onClose}
      footer={false}
      maskClosable = {false}
    >
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label="Select File (CSV)"
          rules={[{ required: true, message: "Please select a file!" }]}
        >
          <input
            type="file"
            accept=".csv"
            required
            onChange={handleFileChange}
          />
        </Form.Item>

        <a href="/inventory_sample.csv" download>Click here to download sample file</a>
        <div className="helperNote">
          Note - Do not include header labels, they are just for reference.
        </div>
        <Form.Item>
          <Button htmlType="submit" type="primary" block loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddInventoryFormCSV;
