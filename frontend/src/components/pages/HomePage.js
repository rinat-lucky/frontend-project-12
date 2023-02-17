import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import { setChannelsList, setCurrentChannel } from '../../slices/channelsSlice';
import { setMessages } from '../../slices/messagesSlice';
import { useAuth, useChat } from '../../hooks';
import Header from '../Header';
import ChannelsPanel from '../ChannelsPanel';
import MessagesPanel from '../MessagesPanel';
import ModalContainer from '../modals/ModalContainer';

const HomePage = () => {
  const activeModal = useSelector((state) => state.channels.activeModal);
  const { user } = useAuth();
  const { getData } = useChat();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rollbar = useRollbar();

  /* eslint-disable consistent-return */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(user.token);
        dispatch(setChannelsList(data.channels));
        dispatch(setCurrentChannel(data.currentChannelId));
        dispatch(setMessages(data.messages));
      } catch (err) {
        if (err.message === 'Network Error') {
          toast.error(t('notice.networkError'));
          rollbar.error(t('notice.networkError'), err);
          throw new Error(`${t('notice.networkErrora')}: ${err}`);
        } else {
          toast.error(t('notice.getData'));
          rollbar.error(t('notice.getData'), err, user);
          throw new Error(`${t('notice.getData')}: ${err}`);
        }
      }
    };
    fetchData();
  }, [dispatch, getData, rollbar, t, user]);
  /* eslint-enable consistent-return */

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsPanel />
            <MessagesPanel />
          </div>
        </div>
      </div>
      {activeModal && <ModalContainer />}
    </>
  );
};

export default HomePage;
