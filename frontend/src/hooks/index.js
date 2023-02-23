import { useContext } from 'react';

import { AuthContext, ChatApiContext } from '../contexts';

export const useAuth = () => useContext(AuthContext);
export const useChat = () => useContext(ChatApiContext);
