import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { setActiveModal } from "../../slices/channelsSlice";
import { useSchemaNaming } from '../../hooks/useSchema';
import { useChat } from '../../hooks';
import ModalForm from './ModalForm';

const AddChannel = () => {
  const channels = useSelector((state) => state.channels.list);
  const dispatch = useDispatch();
  const chat = useChat();

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: useSchemaNaming(channels),
    onSubmit: ({ name }, { resetForm }) => {
      dispatch(setActiveModal(null));
      chat.addChannel({ name });
      resetForm();
    },
  });

  return (<ModalForm form={formik}></ModalForm>);
};

export default AddChannel;
