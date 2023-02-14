import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setChannelsList, setCurrentChannel } from "../../slices/channelsSlice";
import { setMessages } from "../../slices/messagesSlice";
import { routesApp } from "../../routes";
import { useAuth, useChat } from "../../hooks";
import Header from "../Header";
import ChannelsPanel from "../ChannelsPanel";
import MessagesPanel from "../MessagesPanel";
import ModalContainer from "../modals/ModalContainer";

const HomePage = () => {
  const activeModal = useSelector((state) => state.channels.activeModal);
  const { user, logOut } = useAuth();
  const { getData } = useChat();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return navigate(routesApp.loginPage);
    const fetchData = async () => {
      const data = await getData(user.token);
      dispatch(setChannelsList(data.channels));
      dispatch(setCurrentChannel(data.currentChannelId));
      dispatch(setMessages(data.messages));
    };
    fetchData();
  }, []);

  const handleLogOut = useCallback(() => {
    logOut();
    navigate(routesApp.loginPage);
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
