import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { setActiveModal, setCurrentChannel } from '../../slices/channelsSlice';
import { useChat } from '../../hooks';

const DEFAULT_CHANNEL_ID = 1;

const RemoveChannel = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const activeModal = useSelector((state) => state.channels.activeModal);
  const { setChannels } = useChat();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    if (currentChannelId === activeModal.channelId) {
      dispatch(setCurrentChannel(DEFAULT_CHANNEL_ID));
    }
    setChannels('removeChannel', { id: activeModal.channelId });
  };

  return (
    <>
      <p className="lead">{t('removeModal.confirm')}</p>
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

export default RemoveChannel;
