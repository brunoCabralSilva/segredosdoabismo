'use client'
import { ReactNode, useState } from 'react';
import contexto from './context';

interface IProvider { children: ReactNode }

export default function Provider({children }: IProvider) {
  //user
  const [dataUser, setDataUser] = useState({ email: '', displayName: '' });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  //pages
  const [showFeedback, setShowFeedback] = useState(false);
  const [showMessage, setShowMessage] = useState({ show: false, text: '' });
  //navigation
  const [logoutUser, setLogoutUser] = useState(false);
  //notification
  const [listNotification, setListNotification] = useState([0]);

  const scrollToBottom = () => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  const resetPopups = () => {
    setShowForgotPassword(false);
    setShowFeedback(false);
    setLogoutUser(false);
  }

  return (
    <contexto.Provider
      value={{
        resetPopups,
        scrollToBottom,
        logoutUser, setLogoutUser,
        showMessage, setShowMessage,
        showFeedback, setShowFeedback,
        //user
        dataUser, setDataUser,
        showForgotPassword, setShowForgotPassword,
        //notification
        // listNotification,
        // setListNotification,    
      }}
    >
      {children}
    </contexto.Provider>
  );
}

