import React, { useState } from "react";
import OwnerDetailsModal from "./OwnerForm";
import {
  Form,
  Modal,
  Button,
  Row,
  Col,
  Switch,
  Tooltip,
  message,
  Space,
  Typography,
} from "antd";
import {
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  FileAddOutlined,
  CloudUploadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import OwnersForm from "./OwnerForm";
import { useGetCountriesQuery } from "./stores/actions/Lookups";
const { Text, Paragraph } = Typography;

const ParentComponent = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [isEditable, setIsEditable] = useState(modalMode !== "view");

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    mobile: "1234567890",
    email: "johndoe@example.com",
    note: "Important owner.",
    Address: "123 Main Street",
    city: "San Francisco",
    state: "California",
    zipcode: "94107",
    country: "US",
  });

  const openModal = (mode, data = null) => {
    setModalMode(mode);
    if (data) setFormData(data);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    console.log("Form Submitted:", values);
    message.success("Owner details saved successfully!");
    setModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => openModal("create")}>
        Create Owner
      </Button>
      <Button
        onClick={() => openModal("view", formData)}
        style={{ marginLeft: "10px" }}
      >
        View Owner
      </Button>
      <Button
        onClick={() => openModal("edit", formData)}
        style={{ marginLeft: "10px" }}
      >
        Edit Owner
      </Button>

      <Modal
        closable={false}
        footer={null}
        title={
          <Row align="middle" justify="space-between">
            <Col>
              <Text>
                {isEditable === "create"
                  ? "Create Owner Details"
                  : "Owner Details"}
              </Text>
            </Col>

            <Col>
              <Row align="middle" justify="space-between">
                <Row gutter={8}>
                  <Col>
                    <Paragraph
                      style={{
                        fontWeight: "normal",
                        margin: 0,
                        width: "fit-content",
                      }}
                    >
                      Edit Mode
                    </Paragraph>
                  </Col>
                  <Col style={{ marginRight: 15 }}>
                    <Switch
                      checked={isEditable}
                      onChange={() => setIsEditable(!isEditable)}
                      checkedChildren={<CheckOutlined />}
                      unCheckedChildren={<CloseOutlined />}
                    />
                  </Col>
                </Row>

                <Button
                  color="primary" variant="text"
                  icon={
                    isEditable ? (
                      <CloudUploadOutlined style={{ fontSize: 16 }} />
                    ) : (
                      <EditOutlined style={{ fontSize: 16 }} />
                    )
                  }
                >
                  {isEditable ? "Save Changes" : "Edit Details"}
                </Button>
                <Button
                  color="danger"
                  variant="text"
                  icon={<CloseOutlined style={{ fontSize: 16 }} />}
                  onClick={closeModal}
                >
                  Close
                </Button>
              </Row>
            </Col>
          </Row>
        }
        visible={isModalVisible}
        onClose={closeModal}
        width={900}
      >
        <OwnersForm isEditable={isEditable} onSubmit={handleFormSubmit} />
      </Modal>
    </div>
  );
};

export default ParentComponent;
