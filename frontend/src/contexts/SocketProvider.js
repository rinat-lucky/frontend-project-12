import { SocketContext } from './index.js';
import { useDispatch } from 'react-redux';
import { setDeliveryState } from '../slices/messagesSlice.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  
  const chatAPI = {
    addChannel: (channel) => socket.emit('newChannel', channel),
    removeChannel: (id) => socket.emit('removeChannel', { id }),
    renameChannel: ({ id, name }) => socket.emit('renameChannel', { id, name }),
    addMessage: (message) => socket.emit('newMessage', message, (response) => {
      if (response.status === 'ok') {
        dispatch(setDeliveryState('delivered'));
      }
    }),
  };

  return (
    <SocketContext.Provider value={chatAPI}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
