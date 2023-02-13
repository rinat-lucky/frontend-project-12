import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { setActiveModal } from "../../slices/channelsSlice";
import { useSchemaNaming } from '../../hooks/useSchema';
import { useChat } from '../../hooks';
import ModalForm from './ModalForm';

const RenameChannel = () => {
  const chat = useChat();
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.channels.activeModal);
  const channels = useSelector((state) => state.channels.list);
  const targetChannel = channels.find((c) => c.id === activeModal.channelId);

  const formik = useFormik({
    initialValues: { name: targetChannel.name },
    validationSchema: useSchemaNaming(channels),
    onSubmit: ({ name }, { resetForm }) => {
      dispatch(setActiveModal(null));
      chat.renameChannel({name, id: targetChannel.id});
      resetForm();
    },
  });

  return (<ModalForm form={formik}></ModalForm>);
};

export default RenameChannel;
