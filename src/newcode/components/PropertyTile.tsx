import React from 'react';
import { Card, Carousel, Typography, Space, Row, Col, Divider } from 'antd';
import {
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
  AreaChartOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { blue, green, red, yellow } from '@ant-design/colors';

interface Property {
  Id: number;
  Name: string;
  Address: string;
  City: string;
  State: string;
  Zip: string;
  Country: string;
  MediaItems: string[];
  AccountOwnerPropertyMaps: any[];
  AccountTenantPropertyMaps: any[];
  LeaseEndDate: string;
}

interface PropertyTileProps {
  property: Property;
}

const PropertyTile: React.FC<PropertyTileProps> = ({ property }) => {
  const tenantLink = property.AccountTenantPropertyMaps.length > 0;
  const ownerLink = property.AccountOwnerPropertyMaps.length > 0;
  const leaseEndDate = new Date(property.LeaseEndDate);
  const leaseRemaining = Math.ceil((leaseEndDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  return (
    
<Card
  hoverable
  style={{ minWidth: '270px', margin: '0 6px 12px 0', borderRadius: '10px', backgroundColor: '#fff', padding: 0 }}
  cover={
    property.MediaItems.length > 0 ? (
      <Carousel>
        {property.MediaItems.map((imgUrl, index) => (
          <div key={index}>
            <img
              alt={`property-image-${index}`}
              src={imgUrl}
              style={{
                width: '100%',
                height: 160,
                objectFit: 'cover',
                borderRadius: '10px 10px 0 0',
              }}
            />
          </div>
        ))}
      </Carousel>
    ) : (
      <div
        style={{
          height: 200,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography.Text>No Images</Typography.Text>
      </div>
    )
  }
>
  <div>
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        background: 'rgba(0,0,0,0.4)',
        padding: '2px 4px',
        borderRadius: '0 10px 0 0',
        color: '#fff',
      }}
    >
      Built 1999
    </div>
    <Col>
      <Typography.Title
        style={{ margin: 0 }} // Using Ant Design's blue color
        level={5}
      >
        {property.Name}
      </Typography.Title>
      <EnvironmentOutlined style={{ color: "#0977C2" }}/>&nbsp;
      <Typography.Text style={{ color: '#595959' }}>
        {property.Address}, {property.City}, {property.State} {property.Zip}
      </Typography.Text>
      <Divider style={{ margin: '8px 0', borderColor: '#d9d9d9' }} />
      <Row justify="start" gutter={15}>
        <Col>
          <HomeOutlined style={{ color: "#0977C2" }} /> 
          <Typography.Text>&nbsp;{`${property.Bathrooms}`} units</Typography.Text>
          <br />
          <UsergroupDeleteOutlined style={{ color: "#0977C2" }} /> 
          <Typography.Text>&nbsp;{`${property.Bedrooms}`} units</Typography.Text>
          <br />
          <AreaChartOutlined style={{ color: "#0977C2" }} /> 
          &nbsp;<Typography.Text>{property.SqftArea} Sqft</Typography.Text>
        </Col>
        <Col>
          <div>
            <div>
              {ownerLink ? (
                <Typography.Text strong style={{  }}>Owner contacts</Typography.Text> 
              ) : (
                <Typography.Text type="secondary">No Owner</Typography.Text>
              )}
            </div>
            <Row>
              <UserOutlined style={{ color: "#0977C2" }} /> 
              <Typography.Text type="secondary">&nbsp;Rasul</Typography.Text>
            </Row>
            <Row>
              <PhoneOutlined style={{ color: "#0977C2" }} /> 
              <Typography.Text type="secondary">&nbsp;+123 456 7890</Typography.Text>
            </Row>
          </div>
        </Col>
      </Row>
    </Col>
    <Divider style={{ margin: '8px 0', borderColor: '#d9d9d9' }} />
    {tenantLink && (
      <Space direction="vertical" size={6}>
        <Typography.Text style={{ color: '#595959' }}>
          Lease ending in&nbsp;
          <Typography.Text style={{ color: red[5] }}>{leaseRemaining} days</Typography.Text> 
        </Typography.Text>
        {leaseRemaining <= 10 && (
          <Typography.Text type="danger">
            <CalendarOutlined /> Lease is about to end!
          </Typography.Text>
        )}
      </Space>
    )}
  </div>
</Card>
  );
};

const propertyData = [
  {
    Id: 290,
    Name: 'mallaya99999999999',
    Address: '312 Al Mustaqbal Street',
    City: '21312',
    State: '991102',
    Zip: '212333',
    Rooms: ['a', 'b', 'c'],
    Amenities: ['a', 'b', 'c'],
    Bathrooms: 8,
    Bedrooms: 8,
    SqftArea: 338,
    Country: '971',
    BuildYear: '2122',
    MediaItems: ['https://picsum.photos/900/900?blur=4', 'https://picsum.photos/900/900?blur=2'],
    AccountOwnerPropertyMaps: [
      {
        /* owner details */
      },
    ],
    AccountTenantPropertyMaps: [
      {
        TenantId: 36,
        LeaseEndDate: '2026-07-22',
      },
    ],
    LeaseEndDate: '2026-07-22',
  },
  {
    Id: 290,
    Name: 'mallaya99999999999',
    Address: '312 Al Mustaqbal Street',
    City: '21312',
    State: '991102',
    Zip: '212333',
    Rooms: ['a', 'b', 'c'],
    Amenities: ['a', 'b', 'c'],
    Bathrooms: 8,
    Bedrooms: 8,
    SqftArea: 338,
    Country: '971',
    BuildYear: '2122',
    MediaItems: ['https://picsum.photos/900/900?3', 'https://picsum.photos/900/900?blur=4'],
    AccountOwnerPropertyMaps: [
      {
        /* owner details */
      },
    ],
    AccountTenantPropertyMaps: [
      {
        TenantId: 36,
        LeaseEndDate: '2026-07-22',
      },
    ],
    LeaseEndDate: '2026-07-22',
  },
  {
    Id: 290,
    Name: 'mallaya99999999999',
    Address: '312 Al Mustaqbal Street',
    City: '21312',
    State: '991102',
    Zip: '212333',
    Rooms: ['a', 'b', 'c'],
    Amenities: ['a', 'b', 'c'],
    Bathrooms: 8,
    Bedrooms: 8,
    SqftArea: 338,
    Country: '971',
    BuildYear: '2122',
    MediaItems: ['https://picsum.photos/900/900?blur=5', 'https://picsum.photos/900/900?blur=6'],
    AccountOwnerPropertyMaps: [
      {
        /* owner details */
      },
    ],
    AccountTenantPropertyMaps: [
      {
        TenantId: 36,
        LeaseEndDate: '2026-07-22',
      },
    ],
    LeaseEndDate: '2026-07-22',
  },
  {
    Id: 290,
    Name: 'mallaya99999999999',
    Address: '312 Al Mustaqbal Street',
    City: '21312',
    State: '991102',
    Zip: '212333',
    Rooms: ['a', 'b', 'c'],
    Amenities: ['a', 'b', 'c'],
    Bathrooms: 8,
    Bedrooms: 8,
    SqftArea: 338,
    Country: '971',
    BuildYear: '2122',
    MediaItems: ['https://picsum.photos/900/900?blur=7', 'https://picsum.photos/900/900?blur=8'],
    AccountOwnerPropertyMaps: [
      {
        /* owner details */
      },
    ],
    AccountTenantPropertyMaps: [
      {
        TenantId: 36,
        LeaseEndDate: '2026-07-22',
      },
    ],
    LeaseEndDate: '2026-07-22',
  },
  {
    Id: 290,
    Name: 'mallaya99999999999',
    Address: '312 Al Mustaqbal Street',
    City: '21312',
    State: '991102',
    Zip: '212333',
    Rooms: ['a', 'b', 'c'],
    Amenities: ['a', 'b', 'c'],
    Bathrooms: 8,
    Bedrooms: 8,
    SqftArea: 338,
    Country: '971',
    BuildYear: '2122',
    MediaItems: ['https://picsum.photos/900/900?blur=9', 'https://picsum.photos/900/900?blur=10'],
    AccountOwnerPropertyMaps: [
      {
        /* owner details */
      },
    ],
    AccountTenantPropertyMaps: [
      {
        TenantId: 36,
        LeaseEndDate: '2026-07-22',
      },
    ],
    LeaseEndDate: '2026-07-22',
  },
];

const PropertyTileExport = () => {
  return (
    <div
      style={{
        display: 'grid',
        gap: '8px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        width: '100%',
        padding: '16px',
      }}
    >
      {propertyData.map((item) => (
        <>
          <PropertyTile property={item} />
        </>
      ))}
    </div>
  );
};

export default PropertyTileExport;
