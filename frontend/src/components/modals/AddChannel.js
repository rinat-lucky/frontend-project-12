import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useSchemaNaming as useSchema} from '../../hooks/useSchema';
import { useChat } from '../../hooks';
import ModalForm from './ModalForm';
import { setUpdateLoading } from '../../slices/channelsSlice';

const AddChannel = () => {
  const channels = useSelector((state) => state.channels.channelsList);
  const { setChannels } = useChat();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: useSchema(channels),
    onSubmit: ({ name }) => {
      dispatch(setUpdateLoading(true));
      setChannels('newChannel', { name });
      dispatch(setUpdateLoading(false));
    },
  });

  return (<ModalForm form={formik} />);
};

export default AddChannel;
