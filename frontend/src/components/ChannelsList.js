import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { setCurrentChannel } from "../slices/channelsSlice";

const ChannelsList = () => {
  const channels = useSelector((state) => state.channels.list);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();

  const channelsList = channels.map((channel) => {
    const classes = 'w-100 rounded-0 text-start text-truncate border-0';
    const variant = channel.id === currentChannelId ? 'secondary' : null;

    return (
      <li key={channel.id} className="nav-item w-100">
        <Dropdown as={ButtonGroup} className='d-flex'>
          <Button onClick={() => dispatch(setCurrentChannel(channel.id))} variant={variant} className={classes}># {channel.name}</Button>
          {channel.removable && (
            <>
              <Dropdown.Toggle split id="dropdown-split-basic" variant={variant} />
              <Dropdown.Menu>
                <Dropdown.Item>Удалить</Dropdown.Item>
                <Dropdown.Item>Переименовать</Dropdown.Item>
              </Dropdown.Menu>
            </>
          )}
        </Dropdown>
      </li>
    );
  });
  return channelsList;
};

export default ChannelsList;
