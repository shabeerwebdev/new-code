// @ts-nocheck
import React, { useState } from "react";
import { Button, message } from "antd";
import OwnerDetailsModal from "../src/newcode/FinalForm";

const ParentComponent = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // Modes: 'create', 'view', 'edit'

  // Mock data for viewing/editing
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

  // Open the modal
  const openModal = (mode, data = null) => {
    setModalMode(mode);
    if (data) setFormData(data);
    setModalVisible(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Handle form submission
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
      <Button onClick={() => openModal("view", formData)} style={{ marginLeft: "10px" }}>
        View Owner
      </Button>
      <Button onClick={() => openModal("edit", formData)} style={{ marginLeft: "10px" }}>
        Edit Owner
      </Button>

      <OwnerDetailsModal
        visible={isModalVisible}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        mode={modalMode}
      />
    </div>
  );
};

export default ParentComponent;
