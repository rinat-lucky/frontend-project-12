import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MessagesList = ({ messages }) => {
  const channels = useSelector((state) => state.channels.channelsList);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { t } = useTranslation();

  const renderCurrentChannelName = () => {
    if (!channels || !currentChannelId) return '';
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);
    return (<b>{`# ${currentChannel.name}`}</b>);
  };

  const renderMessages = () => {
    if (!messages.length) return '';
    return messages.map((item) => (
      <div key={item.id} className="text-break">
        <b>{`${item.username}:`}</b>
        {` ${item.body}`}
      </div>
    ));
  };

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          {renderCurrentChannelName()}
        </p>
        <span className="text-muted">{t('messagesCount.msg', { count: messages.length })}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {renderMessages()}
      </div>
    </>
  );
};

export default MessagesList;
