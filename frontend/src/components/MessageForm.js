import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { useFormik } from 'formik';
import uniqueId from 'lodash.uniqueid';
import { Form, InputGroup } from 'react-bootstrap';

import { SendMessageButton } from './buttons';
import { addMessage, setCurrentMessage } from '../slices/messagesSlice';

const socket = io();

const MessageForm = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentMessage = useSelector((state) => state.messages.currentMessage);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, [currentChannelId]);

  useEffect(() => {
    if (!Object.keys(currentMessage).length) return;
    socket.on('newMessage', currentMessage => {
      dispatch(addMessage({...currentMessage, id: uniqueId()}));
    });

    return () => socket.off('newMessage');
  }, [currentMessage, dispatch]);
  
  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit:  (values, {resetForm}) => {
      const newMessage = {
        channelId: currentChannelId,
        body: values.message,
        username: currentUser.username,
      };
      dispatch(setCurrentMessage(newMessage));
      socket.emit('newMessage', newMessage);
      resetForm();
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
      <InputGroup hasValidation>
        <Form.Control
          ref={inputEl}
          onChange={formik.handleChange}
          name="message"
          id="message"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
          type="text"
          value={formik.values.message}
        />
        <SendMessageButton message={formik.values.message} />
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
