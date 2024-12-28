import React, { useState } from "react";
import {
  Steps,
  Form,
  Input,
  Button,
  Select,
  Card,
  message,
  Typography,
  Col,
  Row,
} from "antd";
import {
  UserOutlined,
  BankOutlined,
  EnvironmentOutlined,
  AppstoreAddOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import FloatingInput from "./FloatingInput";

const { Step } = Steps;
const { Option } = Select;
const { Title } = Typography;

const MultiStepFormEnhanced: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const steps = [
    {
      title: "Industry Information",
      content: (
        <Card title="Select Your Region" style={{ marginBottom: 20 }}>
          <Form.Item
            name="Country"
            label="Region"
            rules={[{ required: true, message: "Please select your region!" }]}
          >
            <FloatingInput
              label="Select an option here"
              type="select"
              options={[
                { label: "UAE", value: "1" },
                { label: "USA", value: "91" },
                { label: "SAR", value: "971" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="Subscription"
            rules={[
              { required: true, message: "Please select a subscription plan!" },
            ]}
          >
            <FloatingInput
              label="Select an option here"
              type="select"
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
              ]}
            />
          </Form.Item>
          <Form.Item name="Amount">
            <FloatingInput label="Amount" type="currency" />
          </Form.Item>
          <Form.Item name="Date">
            <FloatingInput label="Pick a date" type="date" />
          </Form.Item>
          <Form.Item name="Currency2">
            <FloatingInput label="Mobile Number" type="mobile" />
          </Form.Item>
        </Card>
      ),
      icon: <AppstoreAddOutlined />,
    },
    {
      title: "Company & Contact Details",
      content: (
        <>
          {/* Card for Company Details */}
          <Card title="Company Details" style={{ marginBottom: 24 }}>
            <Row gutter={[16, 24]}>
              <Col span={12}>
                <Form.Item
                  name="FullName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your company name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter company name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="ContactName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the contact name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter primary contact name" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              <Col span={12}>
                <Form.Item
                  name="Phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the phone number!",
                    },
                    // {
                    //   pattern: /^[0-9]{10}$/,
                    //   message: "Enter a valid phone number!",
                    // },
                  ]}
                >
                  <Input placeholder="Enter primary phone" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the email address!",
                    },
                    { type: "email", message: "Enter a valid email address!" },
                  ]}
                >
                  <Input placeholder="Enter primary email address" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              <Col span={12}>
                <Form.Item
                  name="Address1"
                  rules={[
                    { required: true, message: "Please enter your address!" },
                  ]}
                >
                  <Input placeholder="Enter address line" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="City"
                  rules={[
                    { required: true, message: "Please enter your city!" },
                  ]}
                >
                  <Input placeholder="Enter city" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              <Col span={8}>
                <Form.Item
                  name="State"
                  rules={[
                    { required: true, message: "Please select your state!" },
                  ]}
                >
                  <Select placeholder="Select your state">
                    <Option value="CA">California</Option>
                    <Option value="TX">Texas</Option>
                    <Option value="NY">New York</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="Zip"
                  rules={[
                    { required: true, message: "Please enter your zip code!" },
                    {
                      pattern: /^[0-9]{5}$/,
                      message: "Enter a valid zip code!",
                    },
                  ]}
                >
                  <Input placeholder="Enter zip code" />
                </Form.Item>
              </Col>
            </Row>

            <Typography.Title level={5}>
              Additional Contact Details
            </Typography.Title>
            <Row gutter={[16, 24]}>
              <Col span={12}>
                <Form.Item
                  name="AltContactName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the additional contact name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter additional contact name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="AltPhone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the phone number!",
                    },
                    // {
                    //   pattern: /^[0-9]{10}$/,
                    //   message: "Enter a valid phone number!",
                    // },
                  ]}
                >
                  <Input placeholder="Enter additional phone" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              <Col span={12}>
                <Form.Item
                  name="AltEmail"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the email address!",
                    },
                    { type: "email", message: "Enter a valid email address!" },
                  ]}
                >
                  <Input placeholder="Enter additional email address" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </>
      ),
      icon: <EnvironmentOutlined />,
    },
    {
      title: "Bank Details",
      content: (
        <Card title="Bank Details" style={{ marginBottom: 20 }}>
          <Form.Item
            name="FullNames"
            label="Account Holder Full Name"
            rules={[
              {
                required: true,
                message: "Please enter the account holder's name!",
              },
            ]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            name="AccountNumber"
            label="Account Number"
            rules={[
              { required: true, message: "Please enter the account number!" },
            ]}
          >
            <Input placeholder="Enter account number" />
          </Form.Item>
          <Form.Item
            name="BankName"
            label="Bank Name"
            rules={[{ required: true, message: "Please enter the bank name!" }]}
          >
            <Input placeholder="Enter bank name" />
          </Form.Item>
        </Card>
      ),
      icon: <BankOutlined />,
    },
  ];

  const next = () => {
    console.log(form.getFieldValue("Amount"), "red");

    form
      .validateFields()
      .then(() => setCurrentStep((prev) => prev + 1))
      .catch((err) => console.log(err, "ooo"));
  };

  const prev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
    message.success("Form successfully submitted!");
  };

  return (
    <Row gutter={16} style={{ height: "100vh", overflow: "scroll" }}>
      <Col span={17}>
        <Title level={2} style={{ marginLeft: 40, marginBottom: 0 }}>
          Create company
        </Title>
        <Steps current={currentStep} style={{ padding: 40, paddingBottom: 0 }}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} icon={step.icon} />
          ))}
        </Steps>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ padding: 40 }}
        >
          <div style={{ marginBottom: 20 }}>{steps[currentStep].content}</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {currentStep > 0 && <Button onClick={prev}>Previous</Button>}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </div>
        </Form>
      </Col>

      {/* Image Section */}
      <Col style={{ padding: 0 }} span={7}>
        {" "}
        {/* 30% width */}
        <div className="image-section">
          <img
            src="https://qa.eservicepro.com/auth-screen-hand.png"
            alt="placeholder"
            className="right-image"
          />
        </div>
      </Col>
    </Row>
  );
};

export default MultiStepFormEnhanced;
