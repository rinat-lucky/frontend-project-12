import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannel } from "../slices/channelsSlice";

const ChannelsList = () => {
  const channels = useSelector((state) => state.channels.list);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  const channelsList = channels.map((channel) => {
    const baseClasses = 'w-100 rounded-0 text-start text-truncate btn';
    const classes = channel.id === currentChannelId ? `${baseClasses} btn-secondary` : baseClasses;

    return (
      <li key={channel.id} className="nav-item w-100">
        <button onClick={() => dispatch(setCurrentChannel(channel.id))} type="button" className={classes}>
          <span className="me-1">#</span>
          {channel.name}
        </button>
      </li>
    );
  });
  return channelsList;
};

export default ChannelsList;
