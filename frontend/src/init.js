import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import resources from './locales';

import { Provider as StoreProvider } from 'react-redux';
import store from './slices';

import SocketProvider from './contexts/SocketProvider';
import io from 'socket.io-client';

import AuthProvider from './contexts/AuthProvider';
import App from './components/App';
import { addChannel, renameChannel, removeChannel } from './slices/channelsSlice';
import { setDeliveryState } from './slices/messagesSlice';
import { addMessage } from './slices/messagesSlice';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const init = async () => {
  const socket = io();
  
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
  socket.on("connect_error", () => {
    store.dispatch(setDeliveryState('networkError'));
  });

  const i18n = i18next.createInstance();

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
          <SocketProvider socket={socket}>
            <App />
          </SocketProvider>
        </StoreProvider>
      </I18nextProvider>
    </AuthProvider>
  );
};

export default init;
