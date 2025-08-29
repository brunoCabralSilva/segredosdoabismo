import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, runTransaction, where } from "firebase/firestore";
import { capitalizeFirstLetter, getOfficialTimeBrazil } from "./utilities";
import firebaseConfig from "./connection";
import { createNotificationData, registerNotification } from "./notifications";
import { createChatData } from "./chats";
import { createHistory } from "./history";

export const getSessions = async () => {
  const db = getFirestore(firebaseConfig);
  const collectionRef = collection(db, 'sessions');
  const querySnapshot = await getDocs(collectionRef);
  const sessionsList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return sessionsList;
};

export const getSessionByName = async (nameSession: string, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const sessionsCollection = collection(db, 'sessions');
    const querySnapshot = await getDocs(query(sessionsCollection, where('name', '==', nameSession)));
    let sessionList: any;
    if (!querySnapshot.empty) sessionList = querySnapshot.docs[0].data();
    return sessionList;
  } catch (error) {
    setShowMessage({show: true, text: 'Ocorreu um erro ao buscar Sessões: ' + error });
  }
};

export const getSessionById = async (sessionId: string) => {
  const db = getFirestore(firebaseConfig);
  const sessionsCollectionRef = collection(db, 'sessions');
  const sessionDocRef = doc(sessionsCollectionRef, sessionId);
  const sessionDocSnapshot = await getDoc(sessionDocRef);
  if (sessionDocSnapshot.exists()) {
    return { ...sessionDocSnapshot.data(), id: sessionDocSnapshot.id }
  } return null;
};

export const getNameAndDmFromSessions = async (sessionId: string) => {
  const db = getFirestore(firebaseConfig);
  const sessionsCollectionRef = collection(db, 'sessions');
  const sessionDocRef = doc(sessionsCollectionRef, sessionId);
  const sessionDocSnapshot = await getDoc(sessionDocRef);
  if (sessionDocSnapshot.exists()) {
    return sessionDocSnapshot.data();
  } return null;
};

export const createSession = async (
  nameSession: string,
  description: string,
  email: string,
  setShowMessage: any,
) => {
  try {
    const dateMessage = await getOfficialTimeBrazil();
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, 'sessions');
    const newSession = await addDoc(collectionRef, {
      name: nameSession.toLowerCase(),
      creationDate: dateMessage,
      gameMaster: email,
      anotations: '',
      description,
      principles: [],
      favorsAndBans: [],
      players: [],
    });
    const newSessionRef = doc(db, 'sessions', newSession.id);
    await runTransaction(db, async (transaction) => {
      transaction.update(newSessionRef, { id: newSession.id });
    });
    await createNotificationData(newSession.id, setShowMessage);
    await createChatData(newSession.id, setShowMessage);
    await createHistory(newSession.id, setShowMessage);
    return newSession.id;
  } catch (err: any) {
    setShowMessage({ show: true, text: 'Ocorreu um erro ao criar uma sessão: ' + err.message });
  }
};

export const updateSession = async (session: any, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const sessionsCollectionRef = collection(db, 'sessions');
    const sessionDocRef = doc(sessionsCollectionRef, session.id);
    await runTransaction(db, async (transaction) => {
      const sessionDocSnapshot = await getDoc(sessionDocRef);
      if (sessionDocSnapshot.exists()) {
        transaction.update(sessionDocRef, { ...session });
      } else throw new Error('Sessão não encontrada');
    });
  } catch (err: any) {
    setShowMessage({ show: true, text: 'Ocorreu um erro ao atualizar os dados da Sessão: ' + err.message });
  }
};

export const clearHistory = async (id: string, setShowMessage: any) => {
  try {
    const db = getFirestore(firebaseConfig);
    const chatsCollectionRef = collection(db, 'chats');
    const q = query(chatsCollectionRef, where('sessionId', '==', id));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) throw new Error('Sessão não encontrada');
    const docRef = querySnapshot.docs[0].ref;
    await runTransaction(db, async (transaction) => {
      transaction.update(docRef, { list: [] });
    });
  } catch (err: any) {
    setShowMessage({ show: true, text: 'Ocorreu um erro ao limpar o histórico de chat: ' + err.message });
  }
};

export const leaveFromSession = async (
  sessionId: string,
  email: string,
  name: string,
  setShowMessage: any
) => {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, "players");
    const q = query(collectionRef, where("sessionId", "==", sessionId), where("email", "==", email));

    await runTransaction(db, async (transaction) => {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.docs.forEach((playerDoc) => {
          const playerRef = doc(db, "players", playerDoc.id);
          transaction.delete(playerRef);
        });

        const dataNotification = {
          message: `Olá, tudo bem? O jogador ${capitalizeFirstLetter(name)} saiu desta sala. Você pode integrá-lo novamente, caso ele solicite acessar esta sessão.`,
          type: "transfer",
        };

        await registerNotification(sessionId, dataNotification, setShowMessage);

        setShowMessage({
          show: true,
          text: "Esperamos que sua jornada nessa Sessão tenha sido divertida e gratificante. Até logo!",
        });
      } else {
        throw new Error("Jogador não encontrado na sessão.");
      }
    });
  } catch (err: any) {
    setShowMessage({
      show: true,
      text: "Ocorreu um erro ao remover o jogador: " + err.message,
    });
  }
};

export const removeFromSession = async (
  sessionId: string,
  email: string,
  setShowMessage: any
) => {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, "players");
    const q = query(collectionRef, where("sessionId", "==", sessionId), where("email", "==", email));

    await runTransaction(db, async (transaction) => {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.docs.forEach((playerDoc) => {
          const playerRef = doc(db, "players", playerDoc.id);
          transaction.delete(playerRef);
        })
        setShowMessage({ show: true, text: "Jogador Removido com sucesso!" });
      } else throw new Error("Jogador não encontrado na sessão.");
    });
  } catch (err: any) {
    setShowMessage({
      show: true,
      text: "Ocorreu um erro ao remover o jogador: " + err.message,
    });
  }
};

export const transferSheetToGameMaster = async (
  sessionId: string,
  emailPlayer: string,
  emailGameMaster: string,
  setShowMessage: any
) => {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, "players");
    const q = query(collectionRef, where("sessionId", "==", sessionId), where("email", "==", emailPlayer));

    await runTransaction(db, async (transaction) => {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.docs.forEach((playerDoc) => {
          const playerRef = doc(db, "players", playerDoc.id);
          transaction.update(playerRef, { email: emailGameMaster });
        });
        setShowMessage({ show: true, text: "Jogador Removido com sucesso! Todas as Fichas que esse usuário possuía foram atribuídas a você." });
      } else {
        throw new Error("Jogador não encontrado na sessão.");
      }
    });
  } catch (err: any) {
    setShowMessage({
      show: true,
      text: "Ocorreu um erro ao transferir o jogador: " + err.message,
    });
  }
};


export const getAllSessionsByFunction = async (email: string) => {
  const db = getFirestore(firebaseConfig);

  const playersCollectionRef = collection(db, "players");
  const q = query(playersCollectionRef, where("email", "==", email));
  const playersSnapshot = await getDocs(q);

  const sessionIds: string[] = [];
  playersSnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.sessionId) {
      sessionIds.push(data.sessionId);
    }
  });

  const sessionsCollectionRef = collection(db, "sessions");
  const sessionsSnapshot = await getDocs(sessionsCollectionRef);

  const list1: { id: string; name: string }[] = [];
  const list2: { id: string; name: string }[] = [];

  sessionsSnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.gameMaster === email) {
      list1.push({ id: doc.id, name: data.name });
    }
    if (sessionIds.includes(doc.id)) {
      list2.push({ id: doc.id, name: data.name });
    }
  });

  return { list1, list2 };
};

export const deleteSessionById = async (sessionId: string, setShowMessage: any) => {
  const db = getFirestore(firebaseConfig);
  const sessionsCollectionRef = collection(db, 'sessions');
  const sessionDocRef = doc(sessionsCollectionRef, sessionId);
  try {
    await runTransaction(db, async (transaction) => {
      // Deletar a sessão
      transaction.delete(sessionDocRef);
      // Deletar chats relacionados
      const chatsRef = collection(db, 'chats');
      const chatsQuery = query(chatsRef, where('sessionId', '==', sessionId));
      const chatsSnapshot = await getDocs(chatsQuery);
      chatsSnapshot.forEach((chatDoc) => {
        const chatDocRef = doc(chatsRef, chatDoc.id);
        transaction.delete(chatDocRef);
      });
      // Deletar players relacionados
      const playersRef = collection(db, 'players');
      const playersQuery = query(playersRef, where('sessionId', '==', sessionId));
      const playersSnapshot = await getDocs(playersQuery);
      playersSnapshot.forEach((playerDoc) => {
        const playerDocRef = doc(playersRef, playerDoc.id);
        transaction.delete(playerDocRef);
      });
      // Deletar notificações relacionadas
      const notificationsRef = collection(db, 'notifications');
      const notificationsQuery = query(notificationsRef, where('sessionId', '==', sessionId));
      const notificationsSnapshot = await getDocs(notificationsQuery);
      notificationsSnapshot.forEach((notificationDoc) => {
        const notificationDocRef = doc(notificationsRef, notificationDoc.id);
        transaction.delete(notificationDocRef);
      });
      //Deletar Históricos relacionados
      const historyRef = collection(db, 'history');
      const historyQuery = query(historyRef, where('sessionId', '==', sessionId));
      const historySnapshot = await getDocs(historyQuery);
      historySnapshot.forEach((chatDoc) => {
        const chatDocRef = doc(historyRef, chatDoc.id);
        transaction.delete(chatDocRef);
      });
    });
    setShowMessage({ show: true, text: 'A Sessão foi excluída. Esperamos que sua jornada tenha sido divertida e gratificante. Até logo!' });
  } catch (error) {
    setShowMessage({ show: true, text: `Erro ao deletar sessão. Atualize a página e tente novamente (${error}).` });
    return false;
  }
};
