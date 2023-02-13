import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { SendMessageButton } from './buttons';
import { setDeliveryState } from '../slices/messagesSlice';
import { useChat, useAuth } from '../hooks';

const MessageForm = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const deliveryState = useSelector((state) => state.messages.deliveryState);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputEl = useRef(null);
  const chat = useChat();
  const auth = useAuth();

  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannelId, deliveryState]);

  useEffect(() => {
    if (!deliveryState) return;
    const timer = setTimeout(() => dispatch(setDeliveryState('')), 2000);
    return () => clearTimeout(timer);
  }, [deliveryState]);

  const messageStatusText = {
    sending: t('messagesStatus.sending'),
    delivered: t('messagesStatus.delivered'),
    networkError: t('error.network'),
  };

  const f = useFormik({
    initialValues: { message: '' },
    onSubmit:  ({ message }, { resetForm }) => {
      dispatch(setDeliveryState('sending'));
      const newMessage = {
        channelId: currentChannelId,
        body: message,
        username: auth.user.username,
      };
      chat.addMessage(newMessage);
      resetForm();
    },
  });

  return (
    <>
      {!!deliveryState && (<div className='small text-muted'>{messageStatusText[deliveryState]}</div>)}
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
