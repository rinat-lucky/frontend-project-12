import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ApiContext } from '.';
import { setDeliveryState } from '../slices/messagesSlice.js';
import { setActiveModal } from '../slices/channelsSlice.js';
import chatAPI from '../api/ChatApi.js';

const ApiProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { signIn, signUp, getData } = chatAPI();

  const API = {
    signIn,
    signUp,
    getData,
    addMessage: (message, resetForm) => socket.emit('newMessage', message, (response) => {
      if (response.status === 'ok') {
        dispatch(setDeliveryState('delivered'));
        resetForm();
        setTimeout(() => dispatch(setDeliveryState('')), 2000);
      }
    }),
    setChannels: (event, data) => socket.emit(event, data, (response) => {
      if (response.status === 'ok') {
        toast.success(t(`notice.${event}`));
        dispatch(setActiveModal(null));
      }
    }),
  };

  return (
    <ApiContext.Provider value={API}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
