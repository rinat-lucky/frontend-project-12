import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from 'formik';
import { setActiveModal, addChannel } from "../slices/channelsSlice";
import uniqueId from 'lodash.uniqueid';
import * as yup from 'yup';

const AddChannelModal = () => {
  const activeModal = useSelector((state) => state.channels.activeModal);
  const channels = useSelector((state) => state.channels.list);
  const dispatch = useDispatch();
  const inputEl = useRef(null);

  const channelsNames = channels.map((c) => c.name);
  const schema = yup.object().shape({
    channelName: yup.mixed().notOneOf(channelsNames),
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const form = useFormik({
    initialValues: { channelName: '' },
    validationSchema: schema,
    onSubmit: ({ channelName }, { resetForm }) => {
      console.log(schema.isValidSync(channelName));
      const newChannel = {
        id: Number(uniqueId()) + 2,
        name: channelName,
        removable: true,
      }
      dispatch(setActiveModal(null));
      dispatch(addChannel(newChannel));
      resetForm();
    },
  });

  return (
    <Modal show={activeModal === 'add'} centered>

      <Modal.Header>
        <Modal.Title className="h4">Добавить канал</Modal.Title>
        <Button
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn-close"
          variant='link'
          onClick={() => dispatch(setActiveModal(null))}
        />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="channelName"
              id="channelName"
              className="mb-2"
              ref={inputEl}
              onChange={form.handleChange}
              value={form.values.channelName}
              isInvalid={form.touched.channelName && form.errors.channelName}
              required
            />
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">Должно быть уникальным</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button className="me-2" variant="btn-secondary" onClick={() => dispatch(setActiveModal(null))}>Отменить</Button>
              <Button type="submit">Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
