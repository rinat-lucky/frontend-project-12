import { ChatApiContext } from '.';

const ChatApiProvider = ({ socket, children }) => {
  const API = {
    addMessage: (msg, handleResponse) => {
      socket.emit('newMessage', msg, (res) => handleResponse(res));
    },
    setChannels: (event, data, handleResponse) => {
      socket.emit(event, data, (res) => handleResponse(res));
    },
  };

  return (
    <ChatApiContext.Provider value={API}>
      {children}
    </ChatApiContext.Provider>
  );
};

export default ChatApiProvider;
