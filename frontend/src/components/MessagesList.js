import { useSelector } from "react-redux";

const MessagesList = ({ messages }) => {
  const channels = useSelector((state) => state.channels.list);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  
  const renderCurrentChannelName = () => {
    if (!channels || !currentChannelId) return '';
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);
    return (<b># {currentChannel.name}</b>);
  };
  
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          {renderCurrentChannelName()}
        </p>
        <span className="text-muted">{messages.length} сообщений</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {messages.length && messages.map((item) => (
          <div key={item.id}><b>{item.username}:</b> {item.body}</div>
        ))}
      </div>
    </>
  );
}

export default MessagesList;
