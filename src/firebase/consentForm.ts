import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import firebaseConfig from "./connection";
import { FirebaseError } from "firebase/app";
import { IMessage } from "@/interfaces";

export const createConsentForm = async (sessionId: string, email: string, setShowMessage: (state: IMessage) => void) => {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, 'consents'); 
    await addDoc(collectionRef, { sessionId, email, list: [],
    });
  } catch (error: unknown) {
    let errorMessage = "Erro desconhecido";
    let errorCode = "";
    if (error instanceof FirebaseError) {
      errorMessage = error.message;
      errorCode = error.code;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
      setShowMessage({ show: true, text: 'Erro ao registrar Ficha de Consentimento: ' + errorCode + ' - ' + errorMessage + '. Por favor, atualize a página e tente novvamente' });
      return false;
    }
  }

export const getConsentsByEmailAndSessionId = async (email: string, sessionId: string, setShowMessage: (state: IMessage) => void) => {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, 'consents');
    const q = query(collectionRef, where('email', '==', email), where('sessionId', '==', sessionId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setShowMessage({ show: true, text: 'Nenhum registro encontrado para o email e sessionId fornecidos.' });
      return null;
    }
    const consent = querySnapshot.docs[0].data();
    return consent;
  } catch (error: unknown) {
    let errorMessage = "Erro desconhecido";
    let errorCode = "";
    if (error instanceof FirebaseError) {
      errorMessage = error.message;
      errorCode = error.code;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    setShowMessage({ show: true, text: 'Erro ao buscar Ficha de Consentimento: ' + errorCode + ' - ' + errorMessage });
    return null;
  }
};

export const getConsentsBySessionId = async (sessionId: string, setShowMessage: (state: IMessage) => void) => {
  try {
    const db = getFirestore();
    const collectionRef = collection(db, "consents");
    const q = query(collectionRef, where("sessionId", "==", sessionId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setShowMessage({ show: true, text: "Nenhum registro encontrado para o sessionId fornecido." });
      return [];
    }

    const consents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return consents;
  } catch (error: unknown) {
    let errorMessage = "Erro desconhecido";
    let errorCode = "";
    if (error instanceof FirebaseError) {
      errorMessage = error.message;
      errorCode = error.code;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    setShowMessage({ show: true, text: `Erro ao buscar Fichas de Consentimento: ${errorCode} - ${errorMessage}` });
    return [];
  }
};

export const updateConsentList = async (email: string, sessionId: string, newList: any[], setShowMessage: (state: IMessage) => void) => {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, 'consents');
    const q = query(collectionRef, where('email', '==', email), where('sessionId', '==', sessionId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setShowMessage({ show: true, text: 'Nenhum registro encontrado para o email e sessionId fornecidos.' });
      return false;
    }
    const consentDoc = querySnapshot.docs[0];
    await updateDoc(doc(db, 'consents', consentDoc.id), {
      list: newList
    });
    return true;
  } catch (error: unknown) {
    let errorMessage = "Erro desconhecido";
    let errorCode = "";
    if (error instanceof FirebaseError) {
      errorMessage = error.message;
      errorCode = error.code;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    setShowMessage({ show: true, text: 'Erro ao atualizar Ficha de Consentimento: ' + errorCode + ' - ' + errorMessage });
    return false;
  }
};

export const deleteConsent = async (email: string, sessionId: string, setShowMessage: (state: IMessage) => void) => {
  try {
    const db = getFirestore(firebaseConfig);
    const collectionRef = collection(db, 'consents');
    const q = query(collectionRef, where('email', '==', email), where('sessionId', '==', sessionId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setShowMessage({ show: true, text: 'Nenhum registro encontrado para o email e sessionId fornecidos.' });
      return;
    }
    const docRef = doc(db, 'consents', querySnapshot.docs[0].id);
    await deleteDoc(docRef);
  } catch (error: unknown) {
    let errorMessage = "Erro desconhecido";
    let errorCode = "";
    if (error instanceof FirebaseError) {
      errorMessage = error.message;
      errorCode = error.code;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    setShowMessage({ show: true, text: 'Erro ao excluir Ficha de Consentimento: ' + errorCode + ' - ' + errorMessage });
  }
};


