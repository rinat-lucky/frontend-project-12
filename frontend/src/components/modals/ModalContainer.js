import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { Modal, Button } from "react-bootstrap";
import { setActiveModal } from "../../slices/channelsSlice";
import getModal from '../modals';

const ModalContainer = () => {
  const activeModal = useSelector((state) => state.channels.activeModal);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const modalTitle = {
    add: t('addModal.title'),
    rename: t('renameModal.title'),
    remove: t('removeModal.title'),
  };

  return (
    <Modal show={activeModal} centered>
      <Modal.Header>
        <Modal.Title className="h4">{modalTitle[activeModal.type]}</Modal.Title>
        <Button
          variant="link"
          aria-label="Close"
          className="btn-close"
          data-bs-dismiss="modal"
          onClick={() => dispatch(setActiveModal(null))}
        />
      </Modal.Header>
      <Modal.Body>
        {getModal(activeModal.type)}
      </Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
