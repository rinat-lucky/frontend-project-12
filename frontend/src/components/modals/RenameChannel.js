import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useSchemaNaming } from '../../hooks/useSchema';
import { useChat } from '../../hooks';
import ModalForm from './ModalForm';

const RenameChannel = () => {
  const chat = useChat();
  const activeModal = useSelector((state) => state.channels.activeModal);
  const channels = useSelector((state) => state.channels.list);
  const targetChannel = channels.find((c) => c.id === activeModal.channelId);

  const formik = useFormik({
    initialValues: { name: targetChannel.name },
    validationSchema: useSchemaNaming(channels),
    onSubmit: ({ name }) => {
      chat.setChannels('renameChannel', {name, id: targetChannel.id});
    },
  });

  return (<ModalForm form={formik}></ModalForm>);
};

export default RenameChannel;
