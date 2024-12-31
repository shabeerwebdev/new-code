import React from 'react';
import { Modal, Button } from 'antd';
import OwnersForm from './OwnerForm';
import { useGetOwnerByIdQuery } from './services/ownersApi';
import { useGetCountriesQuery } from './services/lookups';
import { ModalHeader } from './components/ModalHeader';

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
  const {
    data: ownerData,
    isLoading,
    isError,
  } = useGetOwnerByIdQuery(8, { skip: !skip });
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

  return (
    <div>
      <Button type="primary" onClick={() => openModal('create')}>
        Create Owner
      </Button>
      <Button onClick={() => openModal('view')} style={{ marginLeft: '10px' }}>
        View Owner
      </Button>

      <Modal
        loading={isLoading}
        footer={null}
        destroyOnClose={true}
        closable={false}
        title={
          <ModalHeader
            modalName={modalState.name}
            isEditable={modalState.isEditable}
            setIsEditable={(val) =>
              setModalState((prev) => ({ ...prev, isEditable: val }))
            }
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
          setDirty={(val) => setModalState((prev) => ({ ...prev, dirty: typeof val !== null }) )}
          isEditable={modalState.isEditable}
          modalName={modalState.name}
        />
      </Modal>
    </div>
  );
};

export default ParentComponent;
