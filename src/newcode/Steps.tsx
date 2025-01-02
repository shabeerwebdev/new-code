import React, { useState } from 'react';
import { Form, Row, Col, Button, Divider, Dropdown, Menu, Layout, Steps, Select, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TextInput, MobileInput, SelectInput, NumberInput, AddressInput } from './AntdInputs';

const { Step } = Steps;
const { Content } = Layout;
const { Text } = Typography;

const AddPropertyOwnerForm = () => {
  const [current, setCurrent] = useState(0);
  const [selectedOwner, setSelectedOwner] = useState<string | null>(null);
  const [form] = Form.useForm();

  const owners = [
    { name: 'John Doe', phone: '123-456-7890', email: 'john@example.com' },
    {
      name: 'Jane Smith',
      phone: '987-654-3210',
      email: 'jane@example.comjane@example.',
    },
    // Add more owners here...
  ];

  const { Option } = Select;

  const handleOwnerSelect = (ownerName: string) => {
    // Find the selected owner's details based on the name
    const owner = owners.find((owner) => owner.name === ownerName);
    if (owner) {
      setSelectedOwner(owner); // Update state with selected owner's details
    }
  };

  console.log(selectedOwner, 'selectedOwner');

  const handleSubmit = (values: any) => {
    console.log('Form values:', values);
    setCurrent(current + 1);
  };

  // Step 1 - Property Details
  const step1Content = (
    <Form style={{ padding: '0 32px 32px' }} form={form} layout="vertical" onFinish={handleSubmit} initialValues={{}}>
      {/* <Divider style={{ fontSize: '16px', fontWeight: 'normal' }} orientation="left">
        Property Owner
      </Divider> */}
      <Typography.Title level={5}>Property Owner</Typography.Title>
      <Row>
        <Col md={8}>
          <Form.Item name="owner">
            <SelectInput
              label="Owner"
              onChange={handleOwnerSelect}
              options={owners.map((owner, index) => ({
                value: owner.name,
                label: (
                  <span>
                    {owner.name} - {owner.phone} - {owner.email}
                  </span>
                ),
              }))}
            />
          </Form.Item>
        </Col>
        {selectedOwner && (
          <Col span={24} style={{ }}>
            <Text style={{marginTop:0}} level={5}>Name: <span>{selectedOwner.name}</span> </Text> <br />
            <Text style={{marginTop:0}} level={5}>Phone: <span>{selectedOwner.phone}</span> </Text> <br />
            <Text style={{marginTop:0}} level={5}>Email: <span>{selectedOwner.email}</span> </Text>
          </Col>
        )}
      </Row>
      {/* <Divider style={{ fontSize: '16px', fontWeight: 'normal' }} orientation="left">
        Details
      </Divider> */}
      <Typography.Title level={5}>Property Details</Typography.Title>
      <Row gutter={24}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="yearBuilt" rules={[{ required: true }]}>
            <TextInput label="Year Built" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="propertyCode" rules={[{ required: true }]}>
            <TextInput label="Property Code" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="propertyName" rules={[{ required: true }]}>
            <TextInput label="Property Name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="propertyType" rules={[{ required: true }]}>
            <SelectInput options={[]} label="Property Type" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="area" rules={[{ required: true }]}>
            <NumberInput label="Area in sqft" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="bedrooms" rules={[{ required: true }]}>
            <NumberInput label="No of Bedrooms" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="bathrooms" rules={[{ required: true }]}>
            <NumberInput label="No of Bathrooms" />
          </Form.Item>
        </Col>
      </Row>
      {/* <Divider style={{ fontSize: '16px', fontWeight: 'normal' }} orientation="left">
        Address
      </Divider> */}
      <Typography.Title level={5}>Property Details</Typography.Title>
      <Col span={12}>
        <Form.Item name="address" rules={[{ required: true }]}>
          <TextInput label="Address" />
        </Form.Item>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="city" rules={[{ required: true }]}>
              <TextInput label="City" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="state" rules={[{ required: true }]}>
              <SelectInput options={[]} label="State" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="zip" rules={[{ required: true }]}>
              <NumberInput label="Zipcode" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="country" rules={[{ required: true }]}>
              <SelectInput options={[]} label="Country" />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      {/* Submit Button */}
      {/* <Row gutter={[24, 24]}>
        <Col span={24}>
          <Button type="primary" htmlType="submit" block size="large" style={{ padding: '12px 16px' }}>
            Next
          </Button>
        </Col>
      </Row> */}
    </Form>
  );

  const leaseContent  = (
    <>
          <Typography.Title level={5}>Property Tenant</Typography.Title>
      <Row>
        <Col md={8}>
          <Form.Item name="owner">
            <SelectInput
              label="Owner"
              onChange={handleOwnerSelect}
              options={owners.map((owner, index) => ({
                value: owner.name,
                label: (
                  <span>
                    {owner.name} - {owner.phone} - {owner.email}
                  </span>
                ),
              }))}
            />
          </Form.Item>
        </Col>
        {selectedOwner && (
          <Col span={24} style={{ }}>
            <Text style={{marginTop:0}} level={5}>Name: <span>{selectedOwner.name}</span> </Text> <br />
            <Text style={{marginTop:0}} level={5}>Phone: <span>{selectedOwner.phone}</span> </Text> <br />
            <Text style={{marginTop:0}} level={5}>Email: <span>{selectedOwner.email}</span> </Text>
          </Col>
        )}
      </Row>
      {/* <Divider style={{ fontSize: '16px', fontWeight: 'normal' }} orientation="left">
        Details
      </Divider> */}
      <Typography.Title level={5}>Property Details</Typography.Title>
      <Row gutter={24}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item name="yearBuilt" rules={[{ required: true }]}>
            <TextInput label="Year Built" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="propertyCode" rules={[{ required: true }]}>
            <TextInput label="Property Code" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="propertyName" rules={[{ required: true }]}>
            <TextInput label="Property Name" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="propertyType" rules={[{ required: true }]}>
            <SelectInput options={[]} label="Property Type" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="area" rules={[{ required: true }]}>
            <NumberInput label="Area in sqft" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="bedrooms" rules={[{ required: true }]}>
            <NumberInput label="No of Bedrooms" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item name="bathrooms" rules={[{ required: true }]}>
            <NumberInput label="No of Bathrooms" />
          </Form.Item>
        </Col>
      </Row>
      </>
  )

  return (
    <Layout>
      <Content
        style={{
          minHeight: 280,
          backgroundColor: 'white',
          // padding: '0 32px 32px',
          position: 'relative',
          border: '1px solid #f9f9f9',
          borderRadius: '16px',
          margin: "20px",
          marginBottom: "40px",
          // maxHeight: "calc(100vh - 40px",
          // overflowY: "auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Steps size="default" current={current} onChange={setCurrent}>
          <Step title="Property Details" />
          <Step title="Rooms" />
          <Step title="Amenities" />
          <Step title="Lease Details" />
          <Step title="Media" />
        </Steps>
        {current === 0 && step1Content}
        {current === 1 && <div></div>} {/* Empty Step 2 */}
        {current === 2 && <div></div>} {/* Empty Step 3 */}
        {current === 3 && leaseContent} {/* Empty Step 3 */}
        {current === 4 && <div></div>} {/* Empty Step 3 */}
        <div
          style={{ marginTop: 16, textAlign: 'right', position: 'sticky', bottom: '50px', backgroundColor: 'white' }}
        >
          <Button
          disabled={current === 0}
            // onClick={prev}
            style={{ marginRight: 8 }}
          >
            Previous
          </Button>
          <Button
            type="primary"
            disabled={current === 4}
             onClick={handleSubmit}
          >
            Next
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default AddPropertyOwnerForm;
