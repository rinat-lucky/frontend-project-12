import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import io from 'socket.io-client';
import filter from 'leo-profanity';

import ApiProvider from './contexts/ApiProvider';
import AuthProvider from './contexts/AuthProvider';
import RollbarProvider from './components/RollbarProvider';
import App from './components/App';
import store from './slices';
import { addChannel, renameChannel, removeChannel } from './slices/channelsSlice';
import { setDeliveryState, addMessage } from './slices/messagesSlice';
import resources from './locales';

const init = async () => {
  filter.loadDictionary('ru');
  const socket = io();
  const i18n = i18next.createInstance();

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
  });
  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(renameChannel({ id, name }));
  });
  socket.on('connect_error', () => {
    store.dispatch(setDeliveryState('networkError'));
  });
  socket.on("connect", () => {
    store.dispatch(setDeliveryState(''));
  });

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <StoreProvider store={store}>
          <ApiProvider socket={socket}>
            <RollbarProvider>
              <App />
              <ToastContainer />
            </RollbarProvider>
          </ApiProvider>
        </StoreProvider>
      </I18nextProvider>
    </AuthProvider>
  );
};

export default init;
