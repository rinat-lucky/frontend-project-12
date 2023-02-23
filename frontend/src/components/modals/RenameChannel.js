import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useChat } from '../../hooks';
import { setActiveModal } from '../../slices/modalSlice';
import ModalForm from './ModalForm';

const RenameChannel = () => {
  const { setChannels } = useChat();
  const activeModal = useSelector((state) => state.modal.activeModal);
  const channels = useSelector((state) => state.channels.channelsList);
  const channelsNames = channels.map((c) => c.name);
  const targetChannel = channels.find((c) => c.id === activeModal.channelId);
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
    initialValues: { name: targetChannel.name },
    validationSchema,
    onSubmit: ({ name }, { setSubmitting }) => {
      const handleResponse = ({ status }) => {
        if (status === 'ok') {
          toast.success(t('notice.renameChannel'));
          dispatch(setActiveModal(null));
        }
      };
      setChannels('renameChannel', { name, id: targetChannel.id }, handleResponse);
      setSubmitting(false);
    },
  });

  return (<ModalForm form={formik} />);
};

export default RenameChannel;
