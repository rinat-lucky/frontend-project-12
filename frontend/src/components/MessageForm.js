import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import io from 'socket.io-client';
import uniqueId from 'lodash.uniqueid';
import { Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

import { SendMessageButton } from './buttons';
import { addMessage, setCurrentMessage, setDeliveredState } from '../slices/messagesSlice';

const socket = io();

const MessageForm = () => {
  const deliveredState = useSelector((state) => state.messages.deliveredState);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentMessage = useSelector((state) => state.messages.currentMessage);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannelId, deliveredState]);

  useEffect(() => {
    if (!Object.keys(currentMessage).length) return;
    socket.on('newMessage', (currentMessage) => {
      dispatch(addMessage({...currentMessage, id: Number(uniqueId())}));
    });

    return () => socket.off('newMessage');
  }, [currentMessage, dispatch]);

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit:  (values, {resetForm}) => {
      dispatch(setDeliveredState(t('messagesStatus.sending')));
      const newMessage = {
        channelId: currentChannelId,
        body: values.message,
        username: userInfo.username,
      };
      dispatch(setCurrentMessage(newMessage));
      socket.emit('newMessage', newMessage, (response) => {
        if (response.status === 'ok') {
          dispatch(setDeliveredState(t('messagesStatus.delivered')));
        } else {
          dispatch(setDeliveredState(t('messagesStatus.errorNetwork')));
        }
      });
      resetForm();
      setTimeout(() => dispatch(setDeliveredState('')), 2000);
    },
  });

  return (
    <>
      <div className='small text-muted'>{deliveredState}</div>
      <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup hasValidation>
          <Form.Control
            ref={inputEl}
            onChange={formik.handleChange}
            name="message"
            id="message"
            aria-label={t('messageLabel')}
            placeholder={t('messagePlaceholder')}
            className="border-0 p-0 ps-2"
            type="text"
            value={formik.values.message}
          />
          <SendMessageButton message={formik.values.message} />
        </InputGroup>
      </Form>
    </>
  );
};

export default MessageForm;
