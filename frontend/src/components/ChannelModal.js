import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from 'formik';
import { setActiveModal, setCurrentChannel, addChannel, renameChannel, removeChannel } from "../slices/channelsSlice";
import uniqueId from 'lodash.uniqueid';
import * as yup from 'yup';

const DEFAULT_CHANNEL_ID = 1;

const ChannelModal = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const activeModal = useSelector((state) => state.channels.activeModal);
  const channels = useSelector((state) => state.channels.list);
  const dispatch = useDispatch();
  const inputEl = useRef(null);

  const channelsNames = channels.map((c) => c.name);
  const schema = yup.object().shape({
    channelName: yup.mixed().notOneOf(channelsNames),
  });

  const getTargetChannel = () => {
    if (!activeModal.channelId) return null;
    return channels.find((c) => c.id === activeModal.channelId); 
  };

  const targetChannel = getTargetChannel();
  const initialValue = { channelName: targetChannel ? targetChannel.name : '' };

  useEffect(() => {
    if (!inputEl.current) return;
    inputEl.current.focus();
  }, []);

  const handleSubmit = (channelName) => {
    switch (activeModal.type) {
      case 'add': {
        const newChannel = {
          id: Number(uniqueId()) + 2,
          name: channelName,
          removable: true,
        };
        return dispatch(addChannel(newChannel));
      }
      case 'rename': {
        const renamedChannel = {
          ...targetChannel,
          name: channelName,
        };
        return dispatch(renameChannel(renamedChannel));
      }
      case 'remove': {
        if (currentChannelId === targetChannel.id) {
          dispatch(setCurrentChannel(DEFAULT_CHANNEL_ID));
        }
        dispatch(removeChannel(targetChannel));
        return dispatch(setActiveModal(null));
      }
      default:
        throw new Error(`Unknown type of modal: ${activeModal.type}`);
    }
  };

  const form = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    onSubmit: ({ channelName }, { resetForm }) => {
      handleSubmit(channelName);
      dispatch(setActiveModal(null));
      resetForm();
    },
  });

  const renderTitle = () => {
    switch (activeModal.type) {
      case 'add':
        return 'Добавить канал';
      case 'rename':
        return 'Переименовать канал';
      case 'remove':
        return 'Удалить канал';
      default:
        throw new Error(`Unknown type of modal: ${activeModal}`);
    }
  };

  const renderForm = () => {
    return activeModal.type === 'remove'
      ? (
          <>
            <p className="lead">Уверены?</p>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2" 
                variant="btn-secondary"
                onClick={() => dispatch(setActiveModal(null))}
              >
                Отменить
              </Button>
              <Button
                variant='danger'
                type="submit"
                onClick={handleSubmit}
              >
                Удалить
              </Button>
            </div>
          </>
        )
      : (
          <Form onSubmit={form.handleSubmit}>
            <Form.Group>
              <Form.Control
                name="channelName"
                id="channelName"
                className="mb-2 w-100"
                ref={inputEl}
                onChange={form.handleChange}
                value={form.values.channelName}
                isInvalid={form.touched.channelName && form.errors.channelName}
                required
              />
              <Form.Label className="visually-hidden" htmlFor="channelName">Имя канала</Form.Label>
              <Form.Control.Feedback type="invalid">Должно быть уникальным</Form.Control.Feedback>
              <div className="d-flex justify-content-end">
                <Button
                  className="me-2" 
                  variant="btn-secondary"
                  onClick={() => dispatch(setActiveModal(null))}
                >
                  Отменить
                </Button>
                <Button type="submit">Отправить</Button>
              </div>
            </Form.Group>
          </Form>
        );
  };

  return (
    <Modal show={activeModal} centered>
      <Modal.Header>
        <Modal.Title className="h4">{renderTitle()}</Modal.Title>
        <Button
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn-close"
          variant='link'
          onClick={() => dispatch(setActiveModal(null))}
        />
      </Modal.Header>

      <Modal.Body>
        {renderForm()}
      </Modal.Body>
    </Modal>
  );
};

export default ChannelModal;
