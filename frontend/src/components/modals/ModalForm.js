import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { setActiveModal } from '../../slices/channelsSlice';

const ModalForm = ({ form }) => {
  const isLoading = useSelector((state) => state.channels.updateLoading);
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  return (
    <Form onSubmit={form.handleSubmit}>
      <Form.Group>
        <Form.Control
          id="name"
          name="name"
          ref={inputEl}
          className="mb-2 w-100"
          value={form.values.name}
          onChange={form.handleChange}
          isInvalid={form.touched.name && form.errors.name}
          disabled={isLoading}
        />
        <Form.Label className="visually-hidden" htmlFor="name">{t('modal.label')}</Form.Label>
        <Form.Control.Feedback type="invalid">{form.errors.name}</Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="btn-secondary"
            onClick={() => dispatch(setActiveModal(null))}
          >
            {t('modal.cancelButton')}
          </Button>
          <Button type="submit" disabled={isLoading || !form.values.name}>
            {t('modal.submitButton')}
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default ModalForm;
