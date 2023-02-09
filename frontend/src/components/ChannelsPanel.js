import { useSelector } from "react-redux";
import { AddChannelButton } from "./buttons";
import ChannelsList from "./ChannelsList";
import { useTranslation } from "react-i18next";

const ChannelsPanel = () => {
  const channels = useSelector((state) => state.channels.list);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { t } = useTranslation();

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channelsTitle')}</span>
        <AddChannelButton />
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels && currentChannelId && (<ChannelsList />)}
      </ul>
    </div>
  );
};

export default ChannelsPanel;
