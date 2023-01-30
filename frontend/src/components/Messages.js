import { useSelector } from 'react-redux';

const Messages = () => {
  const messages = useSelector((state) => state.messages.collection);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const visibleMessages = messages.filter((m) => Number(m.channelId) === Number(currentChannelId));

  return (
    <div>
      {visibleMessages.map((item) => (
        <div key={item.id}><b>{item.username}:</b> {item.body}</div>
      ))}
    </div>
  );
}

export default Messages;
