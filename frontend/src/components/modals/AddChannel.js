import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useChat } from '../../hooks';
import { setActiveModal } from '../../slices/modalSlice';
import { setCurrentChannel } from '../../slices/channelsSlice';
import ModalForm from './ModalForm';

const AddChannel = () => {
  const channels = useSelector((state) => state.channels.channelsList);
  const channelsNames = channels.map((c) => c.name);
  const { setChannels } = useChat();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, t('error.wrongLength'))
      .max(20, t('error.wrongLength'))
      .required(t('error.required'))
      .notOneOf(channelsNames, t('error.notUnique')),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema,
    onSubmit: ({ name }, { setSubmitting }) => {
      const handleResponse = ({ status, data }) => {
        if (status === 'ok') {
          dispatch(setCurrentChannel(data.id));
          dispatch(setActiveModal(null));
          toast.success(t('notice.newChannel'));
        }
      };
      setChannels('newChannel', { name }, handleResponse);
      setSubmitting(false);
    },
  });

  return (<ModalForm form={formik} />);
};

export default AddChannel;
