import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setChannelsList, setCurrentChannel } from "../slices/channelsSlice";
import { setMessages } from "../slices/messagesSlice";
import ChatAPI from "../api/ChatAPI";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import ChannelsPanel from "../components/ChannelsPanel";
import MessagesPanel from "../components/MessagesPanel";
import ModalContainer from "../components/ModalContainer";

const userInfo = JSON.parse(localStorage.getItem('user'));

const HomePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useMemo(() => new ChatAPI(), []);
  const activeModal = useSelector((state) => state.channels.activeModal);

  useEffect(() => {
    if (!userInfo) return navigate('login');
    const fetchData = async () => {
      const data = await api.getData(userInfo.token);
      dispatch(setChannelsList(data.channels));
      dispatch(setCurrentChannel(data.currentChannelId));
      dispatch(setMessages(data.messages));
    };
    fetchData();
  }, []);

  const handleLogOut = useCallback(async () => {
    await auth.setLogout();
    navigate('login');
  }, []); 

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header onLogOut={handleLogOut} />
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
