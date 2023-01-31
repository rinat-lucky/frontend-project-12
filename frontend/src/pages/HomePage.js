import { useEffect, useMemo } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setChannelsList, setCurrentChannel } from "../slices/channelsSlice";
import { setMessages } from "../slices/messagesSlice";
import AuthConsumer from "../contexts/AuthContext";
import ChatAPI from "../api/ChatAPI";
import Header from "../components/Header";
import ChannelsPanel from "../components/ChannelsPanel";
import MessagesPanel from "../components/MessagesPanel";

const HomePage = () => {
  const auth = AuthConsumer();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('userId');
  const api = useMemo(() => new ChatAPI(), []);
  
  useEffect(() => {
    if (!jwt) return navigate('login');
    const fetchData = async () => {
      const data = await api.getData(jwt);
      dispatch(setChannelsList(data.channels));
      dispatch(setCurrentChannel(data.currentChannelId));
      dispatch(setMessages(data.messages));
    };
    fetchData();
  }, [jwt, navigate, api, dispatch]);

  useEffect(() => {
    if (!jwt) return navigate('login');
    const checkAuth = async () => await auth.setLogin(jwt);
    checkAuth();
  }, [jwt, navigate, auth]);

  return (
    <div className="d-flex flex-column h-100">
      <Header logoutBtn={true} />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
        <ChannelsPanel />
        <MessagesPanel /> 
        </div>
      </div>
    </div>
  );
};

export default HomePage;
