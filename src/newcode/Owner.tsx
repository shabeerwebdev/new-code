// @ts-nocheck

import React from 'react';
import { Form, Row, Col, Button } from 'antd';
// import { emailValidation, dropdownValidation, zipcodeValidation, SARPincodeValidation, mediumTextValidation, longTextValidation } from './validations';
import { TextInput, MobileInput, SelectInput } from './CustomComps';

const ManageOwnerForm = ({ countryCode= "91", statesData }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form Submitted:', values);
  };

  const getZipcodeValidation = () => {
    if (Number(countryCode) !== 971 && Number(countryCode) !== 91) {
      return zipcodeValidation;
    } else if (Number(countryCode) === 91) {
      return SARPincodeValidation;
    }
    return null;
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Row gutter={16}>
        {/* Owner Name */}
        <Col span={6}>
          <Form.Item
            name="Name"
            rules={[{ required: true, message: 'Please input the owner name' }]}
          >
            <TextInput label="Owner Name"/>
          </Form.Item>
        </Col>

        {/* Contact Number */}
        <Col span={6}>
          <Form.Item
            name="Phone"
            rules={[{ required: true, message: 'Please input the contact number' }]}
          >
            <MobileInput countryCode={countryCode} label="Contact Number"/>
          </Form.Item>
        </Col>

        {/* Email Address */}
        <Col span={6}>
          <Form.Item
            name="Email"
            rules={[{ required: true, message: 'Please input the email' }]}
          >
            <TextInput label="Email Address" />
          </Form.Item>
        </Col>

        {/* Address */}
        <Col span={6}>
          <Form.Item
            name="Address"
            rules={[{ required: true, message: 'Please input the address' }]}
          >
            <TextInput label="Address" />
          </Form.Item>
        </Col>

        {/* State Dropdown */}
        {/* <Col span={3}>
          <Form.Item
            name="State"
            label="State"
            rules={[{ required: true, message: 'Please select a state' }]}
          >
            <SelectInput options={statesData} />
          </Form.Item>
        </Col> */}

        {/* City */}
        <Col span={3}>
          <Form.Item
            name="City"
            rules={[{ required: true, message: 'Please input the city' }]}
          >
            <TextInput label="City"/>
          </Form.Item>
        </Col>

        {/* Zipcode */}
        {(Number(countryCode) !== 971 && Number(countryCode) !== 91) || Number(countryCode) === 91 ? (
          <Col span={3}>
            <Form.Item
              name="Zip"
              rules={[{ required: true, message: 'Please input the zipcode' }]}
            >
              <TextInput label="Zipcode"/>
            </Form.Item>
          </Col>
        ) : null}

        {/* Country Dropdown */}
        {/* <Col span={countryCode !== 971 ? 3 : 6}>
          <Form.Item
            name="Country"
            label="Country"
            rules={[{ required: true, message: 'Please select a country' }]}
          >
            <SelectInput options={getCountryOptions()} />
          </Form.Item>
        </Col> */}

        {/* Note */}
        <Col span={6}>
          <Form.Item
            name="Note"
            rules={[{ required: true, message: 'Please input a note' }]}
          >
            <TextInput label="Note" />
          </Form.Item>
        </Col>
      </Row>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ManageOwnerForm;
