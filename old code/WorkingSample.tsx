import React from "react";
import {
  TextInput,
  NumberInput,
  CurrencyInput,
  MobileInput,
  SelectInput,
  DateInput,
  TreeSelectInput,
  AddressInput
} from "../src/newcode/AntdInputs";
import { Form } from "antd";
type AddressDetails = {
  formatted_address: string;
  latitude: number;
  longitude: number;
  [key: string]: any;
};

export const ExampleForm: React.FC = () => {
  const [form] = Form.useForm();
  const [addressDetails, setAddressDetails] = React.useState<AddressDetails>({
      formatted_address: "",
      latitude: 0,
      longitude: 0,
    });
console.log(addressDetails, "addressDetails");

  const selectOptions = [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
  ];

  const treeData = [
    {
      title: "Node 1",
      value: "1",
      children: [{ title: "Child Node 1", value: "1-1" }],
    },
    {
      title: "Node 2",
      value: "2",
      children: [{ title: "Child Node 2", value: "2-1" }],
    },
  ];

  return (
    <Form form={form}>
      <Form.Item name="fullName">
        <TextInput label="Enter full name" />
      </Form.Item>
      <Form.Item name="enterNumber">
        <NumberInput label="Number Input" />
      </Form.Item>
      <Form.Item name="currency">
        <CurrencyInput label="Currency Input" countryCode="971" />
      </Form.Item>
      <Form.Item name="mobile">
        <MobileInput label="Mobile Input" countryCode="971" />
      </Form.Item>
      <Form.Item name="selectOne">
        <SelectInput label="Select Input" options={selectOptions} />
      </Form.Item>
      <Form.Item name="dates">
        <DateInput label="Date Input" />
      </Form.Item>
      <Form.Item name="treeSelect">
        <TreeSelectInput label="Tree Select Input" treeData={treeData} />
      </Form.Item>
      <Form.Item name="Address">
        <AddressInput setAddressDetails={setAddressDetails} label="Search Address" />
      </Form.Item>
    </Form>
  );
};
