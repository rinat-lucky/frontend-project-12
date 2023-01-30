import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setChannelsList, setCurrentChannel } from "../slices/channelsSlice";
import { setMessages } from "../slices/messagesSlice";
import ChatAPI from "../api/ChatAPI";
import Header from "../components/Header";
import MessageForm from "../components/MessageForm";
import { AddChannelButton } from "../components/buttons";
import ChannelsList from "../components/ChannelsList";
import AuthConsumer from "../contexts/AuthContext";
import Messages from "../components/Messages";

const HomePage = () => {
  const auth = AuthConsumer();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('userId');
  const api = useMemo(() => new ChatAPI(), []);
  const channels = useSelector((state) => state.channels.list);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.collection);

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

  const renderCurrentChannelName = () => {
    if (!channels || !currentChannelId) return '';
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);
    return (<b># {currentChannel.name}</b>);
  };

  const renderMessages = () => {
    if (!messages.length) return '';
    return <Messages />
  };
  
  return (
    <div className="d-flex flex-column h-100">
      <Header logoutBtn={true} />

      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
              <span>Каналы</span>
              <AddChannelButton />
            </div>
            <ul className="nav flex-column nav-pills nav-fill px-2">
              {channels && currentChannelId 
                && (<ChannelsList channels={channels} currentChannelId={currentChannelId} />)}
            </ul>
          </div>
          
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  {renderCurrentChannelName()}
                </p>
                <span className="text-muted">0 сообщений</span>
              </div>
              <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                {renderMessages()}
              </div>
              <div className="mt-auto px-5 py-3">
                <MessageForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
