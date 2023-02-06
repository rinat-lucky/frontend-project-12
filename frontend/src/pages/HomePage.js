import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setChannelsList, setCurrentChannel } from "../slices/channelsSlice";
import { setMessages } from "../slices/messagesSlice";
import ChatAPI from "../api/ChatAPI";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import ChannelsPanel from "../components/ChannelsPanel";
import MessagesPanel from "../components/MessagesPanel";
import AddChannelModal from "../components/AddChannelModal";
import RenameChannelModal from "../components/RenameChannelModal";
import RemoveChannelModal from "../components/RemoveChannelModal";

const HomePage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('userId');
  const api = useMemo(() => new ChatAPI(), []);
  const activeModal = useSelector((state) => state.channels.activeModal);

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

  const handleLogOut = async () => {
    await auth.setLogout();
    navigate('login');
  }; 

  const renderModal = () => {
    switch (activeModal) {
      case 'add':
        return (<AddChannelModal />);
      case 'rename':
        return (<RenameChannelModal />);
      case 'remove':
        return (<RemoveChannelModal />);
      default:
        throw new Error(`Unknown type of modal: ${activeModal}`);
    }
  };

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
      {activeModal && renderModal()}
    </>
  );
};

export default HomePage;
