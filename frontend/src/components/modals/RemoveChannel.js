import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { setActiveModal } from '../../slices/modalSlice';
import { useChat } from '../../hooks';

const RemoveChannel = () => {
  const activeModal = useSelector((state) => state.modal.activeModal);
  const { removeChannel } = useChat();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {},
    onSubmit: (_, { setSubmitting }) => {
      const handleResponse = () => {
        toast.success(t('notice.removeChannel'));
        setSubmitting(false);
      };
      removeChannel({ id: activeModal.channelId }, handleResponse);
      dispatch(setActiveModal(null));
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <p className="lead">{t('removeModal.confirm')}</p>
      <div className="d-flex justify-content-end">
        <Button variant="btn-secondary" onClick={() => dispatch(setActiveModal(null))} className="me-2">
          {t('removeModal.cancelButton')}
        </Button>
        <Button variant="danger" type="submit" disabled={formik.isSubmitting}>
          {t('removeModal.submitButton')}
        </Button>
      </div>
    </Form>
  );
};

export default RemoveChannel;
