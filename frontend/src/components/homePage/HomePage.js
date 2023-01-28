import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import { setChannelsList, setCurrentChannel } from "../../slices/channelsSlice";
import { setMessages } from "../../slices/messagesSlice";
import ChatAPI from "../../api/ChatAPI";
import Header from "../header/Header";
import AuthConsumer from "../../contexts/AuthContext";

const HomePage = () => {
  const auth = AuthConsumer();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('userId');
  const api = useMemo(() => new ChatAPI(), []);
  const channels = useSelector((state) => state.channels.list);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.value);

  console.log('Messages-list', messages);
  console.log('Channels-list', channels);
  console.log('Current-channel-ID', currentChannelId);

  // const data = useMemo(() => {
  //   const fetchData = async () => await api.getData(jwt);
  //   return fetchData();
  // }, []);

  // useEffect(() => {
  //   if (!jwt) return navigate('login');
  //   dispatch(setChannelsList(data.channels));
  //   dispatch(setCurrentChannel(data.currentChannelId));
  //   dispatch(setMessages(data.messages));
  // }, [jwt, navigate, api, dispatch]);

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
      <div className="m-3">
        <h1>Главная страница приложения</h1>
        <div>
          <Link to="login">на страницу авторизации</Link>
        </div>
        <div>
          <Link to="signup">на страницу регистрации</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
