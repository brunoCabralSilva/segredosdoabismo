import {
  signOut,
  getAuth,
  updatePassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { getUserByEmail } from "./user";
import firebaseConfig from "./connection";
import { IMessage } from "@/interfaces";

export const signIn = async (email: string, password: string) => {
  const auth = getAuth(firebaseConfig);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    return false;
  }
}

export const signOutFirebase = async (setShowMessage: (state: IMessage) => void) => {
  try {
    const auth = getAuth(firebaseConfig);
    await signOut(auth);
    setShowMessage({ show: true, text: 'Você foi deslogado da plataforma! Até logo!' });
  } catch (error) {
    setShowMessage({ show: true, text: `Não foi possível deslogar o usuário. Por favor, atualize a página e Tente novamente (${error}).` });
    return false;
  }
};

export const authenticate = async (
  setShowMessage: (state: IMessage) => void
): Promise<{ email: string; photoURL: string; displayName: string } | null> => {
  return new Promise((resolve) => {
    const auth = getAuth(firebaseConfig);
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user && user.email) {
        const dataUser = await getUserByEmail(user.email, setShowMessage);
        if (dataUser) {
          const displayName = dataUser.firstName + " " + dataUser.lastName;
          const photoURL = dataUser.imageURL;
          resolve({
            email: user.email,
            displayName,
            photoURL,
          });
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
};

export const changeUserPassword = async (
  oldPassword: string,
  email: string,
  newPassword: string,
  setShowMessage: (state: IMessage) => void,
) => {
  const auth = getAuth(firebaseConfig);
  try {
    const credenciais = signInWithEmailAndPassword(auth, email, oldPassword);
    await credenciais;
    const user: User | null = auth.currentUser;
    if (user) {
      await updatePassword(user, newPassword);
      setShowMessage({ show: true, text: 'Senha alterada com sucesso!' });
      return true;
    }
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao alterar a senha: (' + error + ')' });
    return false;
  }
};

export const forgotPassword = async (email: string, setShowMessage: (state: IMessage) => void) => {
  const auth = getAuth(firebaseConfig);
  try {
    await sendPasswordResetEmail(auth, email);
    setShowMessage({ show: true, text: 'Enviamos um link de confirmação para seu Email. Por meio dele, você poderá redefinir sua Senha!' });
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao enviar e-mail de redefinição de senha: ' + error + ')' });
    return false;
  }
};