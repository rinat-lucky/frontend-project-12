import { ChatApiContext } from '.';

const ChatApiProvider = ({ socket, children }) => {
  const checkResponse = (res, callback, timeout) => {
    if (res.status === 'ok') {
      if (timeout) {
        setTimeout(() => callback(res), timeout);
      } else {
        callback(res);
      }
    }
  };
  
  const chatAPI = {
    addMessage: (msg, handleResponse) => {
      socket.emit('newMessage', msg, (res) => checkResponse(res, handleResponse));
    },
    addChannel: (data, handleResponse) => {
      socket.emit('newChannel', data, (res) => checkResponse(res, handleResponse, 300));
    },
    renameChannel: (data, handleResponse) => {
      socket.emit('renameChannel', data, (res) => checkResponse(res, handleResponse));
    },
    removeChannel: (data, handleResponse) => {
      socket.emit('removeChannel', data, (res) => checkResponse(res, handleResponse));
    },
  };

  return (
    <ChatApiContext.Provider value={chatAPI}>
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
