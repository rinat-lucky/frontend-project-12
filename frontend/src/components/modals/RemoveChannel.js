import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { setActiveModal, setLoading } from '../../slices/channelsSlice';
import { useChat } from '../../hooks';

const RemoveChannel = () => {
  const isLoading = useSelector((state) => state.channels.isLoading);
  const activeModal = useSelector((state) => state.channels.activeModal);
  const { setChannels } = useChat();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleClick = () => {
    dispatch(setLoading(true));
    setChannels('removeChannel', { id: activeModal.channelId });
    dispatch(setLoading(false));
  };

  return (
    <>
      <p className="lead">{t('removeModal.confirm')}</p>
      <div className="d-flex justify-content-end">
        <Button variant="btn-secondary" onClick={() => dispatch(setActiveModal(null))} className="me-2">
          {t('removeModal.cancelButton')}
        </Button>
        <Button variant="danger" onClick={handleClick} disabled={isLoading}>
          {t('removeModal.submitButton')}
        </Button>
      </div>
    </>
  );
};

export default RemoveChannel;
