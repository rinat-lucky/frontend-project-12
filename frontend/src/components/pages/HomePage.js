import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setChannelsList, setCurrentChannel } from "../../slices/channelsSlice";
import { setMessages } from "../../slices/messagesSlice";
import AuthAPI from "../../api/AuthAPI";
import { routesApp } from "../../routes";
import { useAuth } from "../../hooks";
import Header from "../Header";
import ChannelsPanel from "../ChannelsPanel";
import MessagesPanel from "../MessagesPanel";
import ModalContainer from "../modals/ModalContainer";

const HomePage = () => {
  const activeModal = useSelector((state) => state.channels.activeModal);
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useMemo(() => new AuthAPI(), []);

  useEffect(() => {
    const { user } = auth;
    if (!user) return navigate(routesApp.loginPage);
    const fetchData = async () => {
      const data = await api.getData(user.token);
      dispatch(setChannelsList(data.channels));
      dispatch(setCurrentChannel(data.currentChannelId));
      dispatch(setMessages(data.messages));
    };
    fetchData();
  }, []);

  const handleLogOut = useCallback(() => {
    auth.logOut();
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
