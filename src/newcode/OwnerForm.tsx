import { Form, Row, Col } from "antd";
import {
  AddressInput,
  TextInput,
  MobileInput,
  SelectInput,
  NumberInput,
} from "./AntdInputs";
import { Typography, Divider } from "antd";
import TextArea from "antd/es/input/TextArea";
import { AddressDetails, StateOption, states } from "./types";
import "../../src/styles.css";
import React from "react";
const { Title } = Typography;
interface OwnersFormProps {
  formData: { [key: string]: any };
  setDirty: (dirty: boolean) => void;
  isEditable: boolean;
  modalName: string;
  statesData: StateOption[];
}

const OwnersForm: React.FC<OwnersFormProps> = ({
  formData,
  setDirty,
  isEditable,
  modalName,
  statesData,
}) => {
  const [form] = Form.useForm();
  const setAddressDetails = (addressDetails: AddressDetails) =>
    form.setFieldsValue(addressDetails);

  return (
    <Form
      form={form}
      initialValues={formData}
      layout="vertical"
      disabled={modalName === "view" && !isEditable}
      onValuesChange={setDirty}
    >
      {/* <Title level={5}>Personal Information</Title> */}
      <Divider orientation="left">Personal Information</Divider>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="Name" rules={[{ required: true }]}>
            <TextInput label="Owner Name" />
          </Form.Item>

          <Form.Item name="Phone" rules={[{ required: true }]}>
            <MobileInput label="Contact Number" countryCode="971" />
          </Form.Item>

          <Form.Item name="Email" rules={[{ type: "email", required: true }]}>
            <TextInput label="Email Address" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="Note">
            <TextArea
              style={{ height: "calc(56px * 3 + 24px * 2)" }}
              placeholder="Additional Notes"
              maxLength={600}
            />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">Address Information</Divider>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="Address" rules={[{ required: true }]}>
            <AddressInput
              statesData={statesData}
              setAddressDetails={setAddressDetails}
              label="Address"
            />
          </Form.Item>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="City" rules={[{ required: true }]}>
                <TextInput label="City" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="State" rules={[{ required: true }]}>
                <SelectInput options={statesData} label="State" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="Zip" rules={[{ required: true }]}>
                <NumberInput label="Zipcode" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="Country" rules={[{ required: true }]}>
                <SelectInput options={[]} label="Country" />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col span={12}>
          <div id="map" className="map-styles"></div>
        </Col>
      </Row>
    </Form>
  );
};

export default OwnersForm;
