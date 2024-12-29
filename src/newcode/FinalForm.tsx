// @ts-nocheck
import React, { useState } from "react";
import { Form, Modal, Button, Row, Col, Switch, Tooltip } from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  FileAddOutlined,
  CloudUploadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  AddressInput,
  TextInput,
  MobileInput,
  SelectInput,
  NumberInput,
} from "./CustomComps";
import { Typography, Divider } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Title, Text } = Typography;
const OwnerDetailsModal = ({ visible, onClose, onSubmit, mode }) => {
  const [form] = Form.useForm();
  const [isEditable, setIsEditable] = useState(mode !== "view");

  // Address handling logic (mock setup)
  const setAddressDetails = (addressDetails) => {
    form.setFieldsValue(addressDetails);
  };

  return (
    <Modal
      closable={false}
      footer={null}
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 600 }}>
            {mode === "create" ? "Create Owner Details" : "Owner Details"}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Tooltip
              title={isEditable ? "Disable Edit Mode" : "Enable Edit Mode"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Edit Mode</span>
                <Switch
                  checked={isEditable}
                  onChange={() => setIsEditable(!isEditable)}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </div>
            </Tooltip>
            <Tooltip title={isEditable ? "Save Changes" : "Edit Details"}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>
                  {isEditable ? "Save Changes" : "Edit Details"}
                </span>
                <Button
                  key="edit"
                  type={isEditable ? "primary" : "default"}
                  onClick={
                    isEditable ? () => form.submit() : () => setIsEditable(true)
                  }
                  icon={
                    isEditable ? (
                      <CloudUploadOutlined
                        style={{ color: "#1890ff", fontSize: 18 }}
                      />
                    ) : (
                      <EditOutlined />
                    )
                  }
                  style={{
                    background: "transparent",
                    boxShadow: "none",
                    border: "none",
                    padding: 0,
                    color: isEditable ? "#1890ff" : "#555",
                    cursor: "pointer",
                  }}
                />
              </div>
            </Tooltip>

            <Tooltip title="Close Modal">
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>Close</span>
                <Button
                  key="cancel"
                  onClick={onClose}
                  icon={
                    <CloseOutlined style={{ color: "#f00", fontSize: 18 }} />
                  }
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    color: "#555",
                    cursor: "pointer",
                  }}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      }
      visible={visible}
      onCancel={onClose}
      width={900}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          fullName: "",
          enterNumber: "",
          currency: "971",
          mobile: "",
          selectOne: "",
          dates: null,
          Address: "",
          city: "",
          state: "",
          country: "",
          zipcode: "",
        }}
        disabled={!isEditable}
      >
        <Title level={5}>Personal Information</Title>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="fullName" rules={[{ required: true }]}>
              <TextInput label="Owner Name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="mobile" rules={[{ required: true }]}>
              <MobileInput label="Contact Number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
          </Col>
          <Col span={12}>
            <Form.Item name="email" rules={[{ type: "email", required: true }]}>
              <TextInput label="Email Address" />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Title level={5}>Address Information</Title>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="Address" rules={[{ required: true }]}>
              <AddressInput
                setAddressDetails={setAddressDetails}
                label="Address"
              />
            </Form.Item>

            <Form.Item name="city" rules={[{ required: true }]}>
              <TextInput label="City" />
            </Form.Item>

            <Form.Item name="state" rules={[{ required: true }]}>
              <SelectInput options={[]} label="State" />
            </Form.Item>

            <Form.Item name="zipcode" rules={[{ required: true }]}>
              <NumberInput label="Zipcode" />
            </Form.Item>

            <Form.Item name="country" rules={[{ required: true }]}>
              <SelectInput options={[]} label="Country" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <div
              id="map"
              style={{
                width: "100%",
                height: "calc(100% - 18px)",
                minHeight: "200px",
                border: "1px solid #ddd",
                borderRadius: 8,
              }}
            ></div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default OwnerDetailsModal;
