'use client'
import { createContext } from 'react';

interface RecipesContext {
  //users
  resetPopups: () => void,
  scrollToBottom: () => void,
  dataUser: { email: string, displayName: string },
  setDataUser: (state: { email: string, displayName: string }) => void,
  showForgotPassword: boolean,
  setShowForgotPassword: (state: boolean) => void,
  //navigation
  logoutUser: boolean,
  setLogoutUser: (state: boolean) => void,
  //pages
  showFeedback: boolean,
  setShowFeedback: (state: boolean) => void,
  showMessage: { show: boolean, text: string },
  setShowMessage: (state: { show: boolean, text: string }) => void,
  //notifications
  // listNotification: any[];
  // setListNotification: (state: any[]) => void,
}

const initialValue: RecipesContext = {
  resetPopups: () => {},
  scrollToBottom: () => {},
  //users
  dataUser: { email: '', displayName: '' },
  setDataUser: () => {},
  showForgotPassword: false,
  setShowForgotPassword: () => {},
  //navigation
  logoutUser: false,
  setLogoutUser: () => {},
  //pages
  showFeedback: false,
  setShowFeedback: () => {},
  showMessage: { show: false, text: '' },
  setShowMessage: () => {},
  //notifications
  // listNotification: [],
  // setListNotification: () => {},
}

const contexto = createContext(initialValue);
export default contexto;