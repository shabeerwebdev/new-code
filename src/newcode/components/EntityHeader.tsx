import { useEffect, useRef, useState } from 'react';
import { Typography, Pagination, Input, Select, Row, Col, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

function EntityHeader() {
  const contentRef = useRef(null);

  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearchFocus = () => setSearchFocused(true);
  const handleSearchBlur = () => setSearchFocused(false);

  const [isBoxShadow, setIsBoxShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = contentRef.current.getBoundingClientRect().top;
      console.log(offset, 'offset');

      if (offset < -29) {
        setIsBoxShadow(true);
      } else {
        setIsBoxShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div
      ref={contentRef}
      style={{
        padding: '20px',
        paddingTop: '50px',
        paddingBottom: '20px',
        position: 'sticky',
        boxShadow: isBoxShadow ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',

        top: '-30px', // Stick to the top
        zIndex: 99, // Higher than other content
        // position: "sticky",
        // top: 0,
        // zIndex: 9,
        background: '#f9f9f9',
      }}
    >
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            Manage Properties
          </Title>
        </Col>
        <Col>
          <Space
            style={{
              width: '100%',
              justifyContent: 'flex-end',
              flexWrap: 'wrap',
            }}
          >
            <Input
              placeholder="Search properties"
              prefix={<SearchOutlined />}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              style={{
                width: searchFocused ? '400px' : '300px',
                transition: 'width 0.3s ease',
                maxWidth: '100%',
                padding: '8px 20px',
              }}
            />
            <Pagination
              showSizeChanger
              // onShowSizeChange={onShowSizeChange}
              defaultCurrent={3}
              total={500}
            />
          </Space>
        </Col>
      </Row>
    </div>
  );
}
export default EntityHeader