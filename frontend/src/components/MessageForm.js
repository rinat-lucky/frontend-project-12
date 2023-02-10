import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import io from 'socket.io-client';
import { Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

import { SendMessageButton } from './buttons';
import { addMessage } from '../slices/messagesSlice';

const socket = io();

const MessageForm = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  const { t } = useTranslation();
  const [ deliveredState, setDeliveredState] = useState('');

  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannelId, deliveredState]);

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      dispatch(addMessage(newMessage));
    });
    socket.on("connect_error", () => {
      setDeliveredState('networkError');
    });
    socket.on("connect", () => {
      setDeliveredState('');
    });

    return () => {
      socket.off('newMessage');
      socket.off('connect_error');
      socket.off('connect');
    }; 
  }, []);

  const messageStatusText = {
    sending: t('messagesStatus.sending'),
    delivered: t('messagesStatus.delivered'),
    networkError: t('error.network'),
  };

  const f = useFormik({
    initialValues: { message: '' },
    onSubmit:  ({ message }, { resetForm }) => {
      setDeliveredState('sending');
      const newMessage = {
        channelId: currentChannelId,
        body: message,
        username: userInfo.username,
      };
      socket.emit('newMessage', newMessage, (response) => {
        if (response.status === 'ok') {
          setDeliveredState('delivered');
          setTimeout(() => setDeliveredState(''), 2000);
          resetForm();
        } 
      });
    },
  });

  return (
    <>
      <div className='small text-muted'>{!!deliveredState && messageStatusText[deliveredState]}</div>
      <Form noValidate onSubmit={f.handleSubmit} className="py-1 border rounded-2">
        <InputGroup hasValidation>
          <Form.Control
            ref={inputEl}
            onChange={f.handleChange}
            name="message"
            id="message"
            aria-label={t('messageLabel')}
            placeholder={t('messagePlaceholder')}
            className="border-0 p-0 ps-2"
            type="text"
            value={f.values.message}
          />
          <SendMessageButton message={f.values.message} />
        </InputGroup>
      </Form>
    </>
  );
};

export default MessageForm;
