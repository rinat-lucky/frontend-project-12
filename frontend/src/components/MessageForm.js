import { useEffect, useRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { SendMessageButton } from './buttons';

const MessageForm = () => {
  const inputEl = useRef(null);
  
  useEffect(() => {
    inputEl.current.focus();
  }, []);
  
  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit:  (values, {resetForm}) => {
      console.log(values.message);
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
