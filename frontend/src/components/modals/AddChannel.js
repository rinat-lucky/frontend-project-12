import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useSchemaNaming as useSchema} from '../../hooks/useSchema';
import { useChat } from '../../hooks';
import { setLoading } from '../../slices/channelsSlice';
import ModalForm from './ModalForm';

const AddChannel = () => {
  const channels = useSelector((state) => state.channels.channelsList);
  const { setChannels } = useChat();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: useSchema(channels),
    onSubmit: ({ name }) => {
      dispatch(setLoading(true));
      setChannels('newChannel', { name });
      dispatch(setLoading(false));
    },
  });

  return (<ModalForm form={formik} />);
};

export default AddChannel;
