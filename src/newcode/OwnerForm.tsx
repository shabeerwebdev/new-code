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
import { useGetCountriesQuery } from "./stores/actions/Lookups";
import { getStatesData } from "./utilities";

const { Title } = Typography;
interface AddressDetails {
  streetName?: string;
  streetNumber?: string;
  neighborhood?: string;
  sublocality?: string;
  premise?: string;
  city?: string;
  county?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  formatted_address?: string;
  latitude?: number;
  longitude?: number;
}
const OwnersForm = ({ isEditable }) => {
  const { data = [], isLoading } = useGetCountriesQuery({
    shape: "TREE",
    WithFilter: false,
    Filter: 50,
  });
  const statesData = getStatesData(data, 971) || [];

  const initialValues = {
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
  };
  const [form] = Form.useForm();
  const setAddressDetails = (addressDetails: AddressDetails) => {
    form.setFieldsValue(addressDetails);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      disabled={!isEditable}
    >
      <Title level={5}>Personal Information</Title>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="fullName" rules={[{ required: true }]}>
            <TextInput label="Owner Name" />
          </Form.Item>

          <Form.Item name="mobile" rules={[{ required: true }]}>
            <MobileInput label="Contact Number" countryCode="971" />
          </Form.Item>

          <Form.Item name="email" rules={[{ type: "email", required: true }]}>
            <TextInput label="Email Address" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="notes">
            <TextArea style={{height: "calc(56px * 3 + 24px * 2)"}} placeholder="Additional Notes" maxLength={600} />
          </Form.Item>
        </Col>
      </Row>

      <Divider />

      <Title level={5}>Address Information</Title>
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
              <Form.Item name="city" rules={[{ required: true }]}>
                <TextInput label="City" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="state" rules={[{ required: true }]}>
                <SelectInput options={statesData} label="State" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item name="zipcode" rules={[{ required: true }]}>
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
  );
};

export default OwnersForm;
