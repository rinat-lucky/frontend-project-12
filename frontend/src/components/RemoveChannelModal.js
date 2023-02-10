import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import { setActiveModal, setCurrentChannel, removeChannel } from "../slices/channelsSlice";

const DEFAULT_CHANNEL_ID = 1;

const RemoveChannelModal = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const activeModal = useSelector((state) => state.channels.activeModal);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    if (currentChannelId === activeModal.channelId) {
      dispatch(setCurrentChannel(DEFAULT_CHANNEL_ID));
    }
    dispatch(removeChannel(activeModal.channelId));
    dispatch(setActiveModal(null));
  };

  return (
    <>
      <p className="lead">{t('removeModal.clarify')}</p>
      <div className="d-flex justify-content-end">
        <Button variant="btn-secondary" onClick={() => dispatch(setActiveModal(null))} className="me-2">
          {t('removeModal.cancelButton')}
        </Button>
        <Button variant="danger" onClick={handleClick}>
          {t('removeModal.submitButton')}
        </Button>
      </div>
    </>
  );
};

export default RemoveChannelModal;
