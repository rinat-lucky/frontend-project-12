import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import { Button, Form } from "react-bootstrap";
import { useFormik } from 'formik';
import io from 'socket.io-client';
import { setActiveModal, addChannel } from "../slices/channelsSlice";
import { useSchemaNaming } from '../hooks/useSchema';

const socket = io();

const AddChannelModal = () => {
  const channels = useSelector((state) => state.channels.list);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  // некорректное поведение - создается несколько идентичных каналов
  useEffect(() => {
    socket.on('newChannel', (newChannel) => {
      console.log('add channel');
      dispatch(addChannel(newChannel)); 
    });

    // return () => socket.off();
  }, []);

  const f = useFormik({
    initialValues: { channelName: '' },
    validationSchema: useSchemaNaming(channels),
    onSubmit: ({ channelName }, { resetForm }) => {
      dispatch(setActiveModal(null));
      resetForm();
      socket.emit('newChannel', { name: channelName });
    },
  });

  return (
    <Form onSubmit={f.handleSubmit}>
      <Form.Group>
        <Form.Control
          name="channelName"
          id="channelName"
          className="mb-2 w-100"
          ref={inputEl}
          onChange={f.handleChange}
          value={f.values.channelName}
          isInvalid={f.touched.channelName && f.errors.channelName}
        />
        <Form.Label className="visually-hidden" htmlFor="channelName">{t('addModal.label')}</Form.Label>
        <Form.Control.Feedback type="invalid">{f.errors.channelName}</Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2" 
            variant="btn-secondary"
            onClick={() => dispatch(setActiveModal(null))}
          >
            {t('addModal.cancelButton')}
          </Button>
          <Button type="submit">{t('addModal.submitButton')}</Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default AddChannelModal;
