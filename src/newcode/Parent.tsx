import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Table, Switch, Tooltip, Layout, Avatar, ConfigProvider, Typography, Pagination } from 'antd';
import OwnersForm from './OwnerForm';
import { useGetOwnerByIdQuery } from './services/ownersApi';
import { useGetCountriesQuery } from './services/lookups';
import { ModalHeader } from './components/ModalHeader';
import {
  CloseOutlined,
  CheckOutlined,
  EyeOutlined,
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { Sidebar } from './components/Sidebar';
import PropertyTileExport from './components/PropertyTile';
import { Input, Select, List, Card, Row, Col, Space } from 'antd';
import AddPropertyOwnerForm from './Steps';
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;
const ParentComponent = () => {
  const [skip, setskip] = React.useState(false);
  const [modalState, setModalState] = React.useState({
    name: '',
    isOpen: false,
    isEditable: false,
    dirty: false,
  });
  const initialValues = {
    Name: '',
    Phone: '',
    Email: '',
    Address: '',
    City: '',
    State: 0,
    Country: '',
    Zip: '',
    Note: '',
  };
  const { data: ownerData, isLoading, isError } = useGetOwnerByIdQuery(8, { skip: !skip });
  const { data: statesData = [] } = useGetCountriesQuery({
    shape: 'TREE',
    WithFilter: false,
    Filter: 50,
  });
  const formData = React.useMemo(() => {
    if (modalState.isOpen) {
      if (modalState.name === 'create') {
        return initialValues;
      } else if (modalState.name === 'view' && !isLoading && !isError) {
        return ownerData;
      }
    }
    return null;
  }, [modalState, isLoading, isError, ownerData]);

  const handleModalState = (name: string) => {
    setskip(name !== 'create');
    setModalState((prev) => ({ ...prev, isOpen: true, name }));
  };

  const openModal = (name: string) => handleModalState(name);

  const closeModal = () => {
    setModalState({
      name: '',
      isOpen: false,
      isEditable: false,
      dirty: false,
    });
  };
  const responseData = {
    CorrelationID: 'some-correlation-id',
    TraceTag: 'some-trace-tag',
    StatusCode: 200,
    Data: {
      Id: 8,
      AcctId: 37,
      Code: '007',
      Name: 'sd',
      Type: 10,
      Email: 'loft@fjs.com',
      Phone: '2345678765723456787657234567876572345678765723456787657',
      Address:
        'Sector 67, Gautam Buddh Nagar, Meerut DivisionSector 67, Gautam Buddh Nagar, Meerut DivisionSector 67, Gautam Buddh Nagar, Meerut Division',
      City: 'Noida',
      State: 991101,
      Zip: '201307',
      Country: 91,
      Region: 3300,
      Note: 'as',
      Status: 18010,
    },
    LogEntries: [],
  };

  // Extracting important data for the table
  const dataSource = [
    {
      key: responseData.Data.Id, // unique key
      id: responseData.Data.Id,
      name: responseData.Data.Name,
      type: responseData.Data.Type,
      email: responseData.Data.Email,
      phone: responseData.Data.Phone,
      status: responseData.Data.Status,
      address: responseData.Data.Address,
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      width: 300,
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button color="default" variant="filled" onClick={() => openModal('view')} icon={<EyeOutlined />}>
          View
        </Button>
      ),
    },
    {
      title: 'Active Status',
      key: 'status',
      render: (_, record) => (
        <Tooltip title="Toggle to Inactive">
          <Switch
            checked={record.isActive}
            // onChange={setIsEditable}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        </Tooltip>
      ),
    },
  ];
  const [collapsed, setCollapsed] = React.useState(false);

  const userProfile = {
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.jpg', // Replace with actual image URL
  };

  const customTheme = {
    components: {
      Steps: {
        iconFontSize: "18px",
      },
      Menu: {
        itemHoverColor: 'white',
        itemColor: 'white',
        itemSelectedColor: '#333',
        itemBorderRadius: 0,
        activeBarWidth: '100%',
        itemMarginInline: 0,
        itemSelectedBg: '#f9f9f9',
        itemHeight: 50,
        groupTitleFontSize: 20,
        fontSize: 16,
      },
    },
    token: {
      colorBorder: '#DBDBDB',
      colorBorderSecondary: '#DBDBDB',
      colorPrimary: '#0977C2', // main-blue
      colorLink: '#0977C2', // main-blue (for links, etc.)
      colorSuccess: '#B0E4A4', // chart-green
      colorWarning: '#FFD873', // chart-yellow
      colorError: '#ED685F', // cool-red
      colorInfo: '#78B9D9', // light-blue
      colorTextBase: '#111111', // dark-text
      colorTextSecondary: '#666666', // light-gray
      colorTextTertiary: '#828282', // gray-tone
      colorBgBase: '#FFFFFF', // White background
      colorBgSecondary: '#ECECEC', // light-gray (secondary background)
      colorBgHover: '#F9F9F9', // white-smoke (hover background)
      // colorBorder: '#DBDBDB', // silver-gray
      // colorBorderSecondary: '#999999', // cement-gray
      colorErrorText: '#FF4D4F', // error text
      colorWhite: '#FFFFFF', // white color
      colorBlack: '#111111', // jet-black
      colorHighlight: '#FFD873', // sunshine-yellow
      colorGray: '#D2D2D2', // medium-gray
      colorLightGray: '#F2F2F2', // light-silver
      colorPaleGray: '#EEEDED', // pale-gray
      colorChartBlue: '#5897C4', // chart-blue
      colorChartGreen: '#B0E4A4', // chart-green
      colorChartYellow: '#FFD873', // chart-yellow
      colorChartCream: '#FDC997', // chart-cream
      colorSlateGray: '#7775756b', // slate-gray
      colorAzureBlue: '#0B89DF', // azure-blue
      colorOceanBlue: '#016FB1', // ocean-blue
      colorBlushPink: '#F4BCBC', // blush-pink
      colorCharcoalGray: '#555555', // charcoal-gray
      colorNavyBlack: '#2A3547', // navy-black
    },
  };

  return (
    <ConfigProvider theme={customTheme}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout>
          <Content style={{ backgroundColor: '#f9f9f9' }}>
            
            {/* <div style={{ width: 'fit-content', marginLeft: 'auto', marginRight: '20px', marginTop: '12px' }}>
              <Button type="primary" icon={<PlusOutlined />}>
                Create New Property
              </Button>
            </div>
            <Typography.Title level={3}>Manage Properties</Typography.Title>
            <Button type="primary" onClick={() => openModal('create')}>
              Create Property
            </Button> */}
            {/* <Table dataSource={dataSource} columns={columns} pagination={false} />
            <Button onClick={() => openModal('view')} style={{ marginLeft: '10px' }}>
              View Owner
            </Button> */}
            {/* <PropertyTileExport /> */}
            {/* <div style={{position: "absolute", bottom: "70px",left: "50%", transform: 'translateX(-50%) translateX(130px)',}} >
            <Pagination defaultCurrent={1} total={50} /></div> */}
            <AddPropertyOwnerForm />
            <Modal
              loading={isLoading}
              footer={null}
              destroyOnClose
              closable={false}
              title={
                <ModalHeader
                  modalName={modalState.name}
                  isEditable={modalState.isEditable}
                  setIsEditable={(val) => setModalState((prev) => ({ ...prev, isEditable: val }))}
                  closeModal={closeModal}
                  dirty={modalState.dirty}
                />
              }
              open={modalState.isOpen}
              width={900}
            >
              <OwnersForm
                formData={formData}
                statesData={statesData}
                setDirty={(val) =>
                  setModalState((prev) => ({
                    ...prev,
                    dirty: typeof val !== null,
                  }))
                }
                isEditable={modalState.isEditable}
                modalName={modalState.name}
              />
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default ParentComponent;
