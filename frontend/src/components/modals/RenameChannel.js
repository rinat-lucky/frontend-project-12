import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useSchemaNaming as useSchema } from '../../hooks/useSchema';
import { useChat } from '../../hooks';
import ModalForm from './ModalForm';
import { setUpdateLoading } from '../../slices/channelsSlice';

const RenameChannel = () => {
  const { setChannels } = useChat();
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.channels.activeModal);
  const channels = useSelector((state) => state.channels.channelsList);
  const targetChannel = channels.find((c) => c.id === activeModal.channelId);

  const formik = useFormik({
    initialValues: { name: targetChannel.name },
    validationSchema: useSchema(channels),
    onSubmit: ({ name }) => {
      dispatch(setUpdateLoading(true));
      setChannels('renameChannel', { name, id: targetChannel.id });
      dispatch(setUpdateLoading(false));
    },
  });

  return (<ModalForm form={formik} />);
};

export default RenameChannel;
