import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  HomeOutlined,
  UsergroupAddOutlined,
  SearchOutlined, // For Inspection
  BuildOutlined, // Corrected icon for Properties
  TeamOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
const { Text } = Typography;

export const Sidebar = ({ collapsed, setCollapsed }) => {
  const routes = [
    { title: 'Home', icon: <HomeOutlined />, route: '/home' },
    {
      title: 'Properties',
      icon: <BuildOutlined />,
      route: '/manageproperties',
    }, // Updated for Properties
    { title: 'Owners', icon: <UsergroupAddOutlined />, route: '/manageowner' },
    {
      title: 'Inspection',
      icon: <SearchOutlined />,
      route: '/inspect/property',
    }, // Updated for Inspection
    { title: 'Tenants', icon: <TeamOutlined />, route: '/managetenants' },
    { title: 'Employees', icon: <IdcardOutlined />, route: '/manageemployees' },
  ];
  return (
    <Sider
      className="SidebarContainer"
      width={270}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
            position: 'sticky', // Fix the sidebar position
            top: 0, // Pin the sidebar to the top of the screen
            height: '100vh', // Full viewport height
            zIndex: 10,
            paddingTop: 0
          }}
    >
      <div className="logo" style={{ color: 'white', textAlign: 'center', margin:"5px" }}>
        {<img style={{width: "100%"}} src='https://qa.eservicepro.com/assets/logo-C3EIZe5V.png'/>}
        {/* {<img style={{width: "100%"}} src='https://qa.eservicepro.com/assets/logo-C3EIZe5V.png'/>} */}
        {/* EservicePro */}
      </div>

      <Menu className="SidebarContainer" mode="inline" defaultSelectedKeys={['1']}>
        {routes.map((route, index) => (
          <Menu.Item
            color="red"
            key={index}
            icon={React.cloneElement(route.icon, {
              style: { fontSize: '18px' },
            })}
          >
            {!collapsed && <span className="menu-title">{route.title}</span>}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};
