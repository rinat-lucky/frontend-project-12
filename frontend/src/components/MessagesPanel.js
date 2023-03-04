import { useSelector } from 'react-redux';
import MessagesList from './MessagesList';
import MessageForm from './MessageForm';
import { selectors } from '../slices/messagesSlice';

const MessagesPanel = () => {
  const messages = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const visibleMessages = messages.filter((m) => Number(m.channelId) === Number(currentChannelId));

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <MessagesList messages={visibleMessages} />
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default MessagesPanel;
