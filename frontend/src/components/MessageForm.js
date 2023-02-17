import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { setDeliveryState } from '../slices/messagesSlice';
import { useChat, useAuth } from '../hooks';

const MessageForm = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const deliveryState = useSelector((state) => state.messages.deliveryState);
  const { addMessage } = useChat();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  const auth = useAuth();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannelId, deliveryState]);

  const messageStatusText = {
    sending: t('messagesStatus.sending'),
    delivered: t('messagesStatus.delivered'),
    networkError: t('error.network'),
  };

  const f = useFormik({
    initialValues: { message: '' },
    onSubmit: ({ message }, { resetForm }) => {
      setLoading(true);
      dispatch(setDeliveryState('sending'));
      const filteredText = filter.clean(message);
      const newMessage = {
        channelId: currentChannelId,
        body: filteredText,
        username: auth.user.username,
      };
      addMessage(newMessage, resetForm);
      setLoading(false);
    },
  });

  return (
    <>
      {!!deliveryState && (<div className="small text-muted">{messageStatusText[deliveryState]}</div>)}
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
            disabled={isLoading}
          />
          <Form.Label className="visually-hidden" htmlFor="message">{t('messageLabel')}</Form.Label>
          <Button
            type="submit"
            variant={null}
            className="btn-group-vertical border-0"
            disabled={isLoading || !f.values.message}
          >
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">{t('messageButton')}</span>
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default MessageForm;
