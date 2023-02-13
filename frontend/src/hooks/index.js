import { useContext } from 'react';

import { AuthContext, SocketContext } from '../contexts';

export const useAuth = () => useContext(AuthContext);
export const useChat = () => useContext(SocketContext);
