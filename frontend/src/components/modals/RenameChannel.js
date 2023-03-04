import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useChat } from '../../hooks';
import { setActiveModal } from '../../slices/modalSlice';
import ModalForm from './ModalForm';
import { selectors } from '../../slices/channelsSlice';

const RenameChannel = () => {
  const { renameChannel } = useChat();
  const activeModal = useSelector((state) => state.modal.activeModal);
  const channels = useSelector(selectors.selectAll);
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
      const handleResponse = () => {
        dispatch(setActiveModal(null));
        toast.success(t('notice.renameChannel'));
        setSubmitting(false);
      };
      renameChannel({ ...targetChannel, name }, handleResponse);
    },
  });

  return (<ModalForm form={formik} />);
};

export default RenameChannel;
