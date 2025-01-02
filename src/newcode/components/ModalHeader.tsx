import { Row, Typography, Col, Switch, Button } from 'antd';
import {
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
const { Paragraph } = Typography;

interface ModalHeaderProps {
  modalName: string;
  isEditable: boolean;
  setIsEditable: (val: boolean) => void;
  closeModal: () => void;
  dirty: boolean;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  modalName,
  isEditable,
  setIsEditable,
  closeModal,
  dirty,
}) => {
    console.log(modalName === 'view' && isEditable && dirty !== null, 

        modalName === 'view', isEditable, dirty, "mmmopo"
    );
    
  return (
    <Row align="middle" justify="space-between">
      <Typography.Title style={{ margin: 0 }} level={4}>
        {modalName === 'create' ? 'Create Owner Details' : 'Owner Details'}
      </Typography.Title>

      <Row gutter={16} align="middle" justify="space-between">
        {modalName !== 'create' && (
          <Col>
            <Row gutter={8}>
              <Col>
                <Paragraph
                  style={{
                    fontWeight: 'normal',
                    margin: 0,
                    width: 'fit-content',
                  }}
                >
                  Edit Mode
                </Paragraph>
              </Col>
              <Col>
                <Switch
                  checked={isEditable}
                  onChange={setIsEditable}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Col>
            </Row>
          </Col>
        )}
        {((modalName === 'view' && isEditable && dirty) ||
          (modalName === 'create' && dirty)) && (
          <Col>
            <Button
              color="primary"
              variant="filled"
              icon={
                isEditable ? (
                  <CloudUploadOutlined style={{ fontSize: 16 }} />
                ) : (
                  <EditOutlined style={{ fontSize: 16 }} />
                )
              }
            >
              Save Changes
            </Button>
          </Col>
        )}
        <Col>
          <Button
            color="danger"
            variant="filled"
            icon={<CloseOutlined style={{ fontSize: 16 }} />}
            onClick={closeModal}
          >
            Close
          </Button>
        </Col>
      </Row>
    </Row>
  );
};
