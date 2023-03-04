import { ChatApiContext } from '.';

const ChatApiProvider = ({ socket, children }) => {
  const chatAPI = {
    addMessage: (msg, handleResponse) => {
      socket.emit('newMessage', msg, (res) => {
        if (res.status === 'ok') {
          handleResponse(res);
        }
      });
    },
    addChannel: (data, handleResponse) => {
      socket.emit('newChannel', data, (res) => {
        if (res.status === 'ok') {
          setTimeout(() => handleResponse(res), 700);
        }
      });
    },
    renameChannel: (data, handleResponse) => {
      socket.emit('renameChannel', data, (res) => {
        if (res.status === 'ok') {
          handleResponse(res);
        }
      });
    },
    removeChannel: (data, handleResponse) => {
      socket.emit('removeChannel', data, (res) => {
        if (res.status === 'ok') {
          handleResponse(res);
        }
      });
    },
  };

  return (
    <ChatApiContext.Provider value={chatAPI}>
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
