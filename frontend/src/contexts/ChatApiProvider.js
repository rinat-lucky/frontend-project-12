import { ChatApiContext } from '.';

const ChatApiProvider = ({ socket, children }) => {
  const chatAPI = {
    addMessage: (msg, handleResponse) => {
      socket.emit('newMessage', msg, (res) => handleResponse(res));
    },
    addChannel: (data, handleResponse) => {
      socket.emit('newChannel', data, (res) => handleResponse(res));
    },
    renameChannel: (data, handleResponse) => {
      socket.emit('renameChannel', data, (res) => handleResponse(res));
    },
    removeChannel: (data, handleResponse) => {
      socket.emit('removeChannel', data, (res) => handleResponse(res));
    },
  };

  return (
    <ChatApiContext.Provider value={chatAPI}>
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
