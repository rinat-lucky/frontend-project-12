import { useDispatch } from 'react-redux';
import { setCurrentChannel } from "../slices/channelsSlice";

const ChannelsList = (props) => {
  const { channels, currentChannelId } = props;
  const dispatch = useDispatch();

  const channelsList = channels.map((channel) => {
    const baseClasses = 'w-100 rounded-0 text-start btn';
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
