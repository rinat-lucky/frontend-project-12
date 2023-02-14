import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useSchemaNaming } from '../../hooks/useSchema';
import { useChat } from '../../hooks';
import ModalForm from './ModalForm';

const AddChannel = () => {
  const channels = useSelector((state) => state.channels.list);
  const chat = useChat();

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: useSchemaNaming(channels),
    onSubmit: ({ name }) => chat.setChannels('newChannel', {name}),
  });

  return (<ModalForm form={formik}></ModalForm>);
};

export default AddChannel;
