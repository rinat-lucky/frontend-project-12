import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRollbar } from '@rollbar/react';

import { fetchData } from '../../slices/channelsSlice';
import { useAuth } from '../../hooks';
import Header from '../Header';
import ChannelsPanel from '../ChannelsPanel';
import MessagesPanel from '../MessagesPanel';
import ModalContainer from '../modals/ModalContainer';

const HomePage = () => {
  const activeModal = useSelector((state) => state.modal.activeModal);
  const err = useSelector((state) => state.channels.error);
  const { logOut } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rollbar = useRollbar();

  useEffect(() => {
    dispatch(fetchData());
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  if (err) {
    switch (err.code) {
      case 'ERR_NETWORK':
        toast.error(t('notice.networkError'));
        rollbar.error(t('notice.networkError'), err);
        throw new Error(`${t('notice.networkError')}: ${err}`);
      case 'ERR_BAD_REQUEST':
        logOut();
        throw new Error(err);
      default:
        toast.error(t('notice.getData'));
        rollbar.error(t('notice.getData'), err);
        throw new Error(`${t('notice.getData')}: ${err}`);
    }
  }

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
