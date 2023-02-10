import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { Button, Form } from "react-bootstrap";
import { useFormik } from 'formik';
import { setActiveModal, renameChannel } from "../slices/channelsSlice";
import { useSchemaNaming } from '../hooks/useSchema';

const RenameChannelModal = () => {
  const activeModal = useSelector((state) => state.channels.activeModal);
  const channels = useSelector((state) => state.channels.list);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  const targetChannel = channels.find((c) => c.id === activeModal.channelId);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const f = useFormik({
    initialValues: { channelName: targetChannel.name },
    validationSchema: useSchemaNaming(channels),
    onSubmit: ({ channelName }, { resetForm }) => {
      const channelData = {
        newName: channelName,
        targetChannelID: targetChannel.id,
      };
      dispatch(renameChannel(channelData));
      dispatch(setActiveModal(null));
      resetForm();
    },
  });

  return (
    <Form onSubmit={f.handleSubmit}>
      <Form.Group>
        <Form.Control
          ref={inputEl}
          id="channelName"
          name="channelName"
          className="mb-2 w-100"
          onChange={f.handleChange}
          value={f.values.channelName}
          isInvalid={f.touched.channelName && f.errors.channelName}
        />
        <Form.Label className="visually-hidden" htmlFor="channelName">{t('renameModal.label')}</Form.Label>
        <Form.Control.Feedback type="invalid">{f.errors.channelName}</Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="btn-secondary" onClick={() => dispatch(setActiveModal(null))}>
            {t('renameModal.cancelButton')}
          </Button>
          <Button type="submit">{t('renameModal.submitButton')}</Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default RenameChannelModal;
