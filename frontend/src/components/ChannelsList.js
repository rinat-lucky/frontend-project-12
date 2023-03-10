import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel, selectors } from '../slices/channelsSlice';
import { setActiveModal } from '../slices/modalSlice';

const CHANNEL_OPTIONS = ['rename', 'remove'];

const ChannelsList = () => {
  const channels = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channelsList = channels.map((channel) => {
    const variant = channel.id === currentChannelId ? 'secondary' : null;

    const optionButtons = (
      <>
        <Dropdown.Toggle split id="dropdown-split-basic" variant={variant} className="border-0 w-auto">
          <span className="visually-hidden">{t('channelSettings')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {CHANNEL_OPTIONS.map((opt) => (
            <Dropdown.Item
              onClick={() => dispatch(setActiveModal({ type: opt, channelId: channel.id }))}
              key={opt}
            >
              {t(`channelsButton.${opt}`)}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </>
    );

    return (
      <li key={channel.id} className="nav-item w-100">
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            className="w-100 rounded-0 text-start text-truncate border-0"
            onClick={() => dispatch(setCurrentChannel(channel.id))}
            variant={variant}
          >
            {`# ${channel.name}`}
          </Button>
          {channel.removable && optionButtons}
        </Dropdown>
      </li>
    );
  });
  return channelsList;
};

export default ChannelsList;
