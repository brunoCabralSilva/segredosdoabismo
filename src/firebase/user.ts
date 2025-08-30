'use client'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, runTransaction, where } from 'firebase/firestore';
import { createProfileImage } from './storage';
import firebaseConfig from "./connection";
import { IMessage } from '@/interfaces';
import { FirebaseError } from 'firebase/app';

export async function registerUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  image: File,
  setShowMessage: (state: IMessage) => void,
) {
  const auth = getAuth(firebaseConfig);
  const db = getFirestore(firebaseConfig);
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const imageURL = await createProfileImage(user.uid, image, setShowMessage);
    const collectionRef = collection(db, 'users'); 
    await addDoc(collectionRef, {
      email,
      firstName,
      lastName,
      imageURL,
    });
    setShowMessage({ show: true, text: 'Usuário registrado com sucesso!' });
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
    setShowMessage({ show: true, text: 'Erro ao registrar usuário: ' + errorCode + ' - ' + errorMessage });
    return false;
  }
}

export async function getUserByEmail(email: string, setShowMessage: (state: IMessage) => void
) {
  try {
    const db = getFirestore(firebaseConfig);
    const usersCollectionRef = collection(db, 'users');
    const q = query(usersCollectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('Usuário com o email fornecido não encontrado.');
    } else {
      let user: any;
      querySnapshot.forEach((doc: any) => {
        user = doc.data();
        user.id = doc.id;
      });
      return user;
    }
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao obter usuário por email: ' + error });
    return false;
  }
}

export async function getUserById(userId: string, setShowMessage: (state: IMessage) => void
) {
  try {
    const db = getFirestore(firebaseConfig);
    const usersCollectionRef = collection(db, 'users');
    const userDoc = await getDoc(doc(usersCollectionRef, userId));

    if (!userDoc.exists()) {
      setShowMessage({ show: true, text: 'Usuário com o ID fornecido não encontrado.' });
      return null;
    } else {
      const user = userDoc.data();
      if (user) {
        user.id = userDoc.id;
        return user;
      } else {
        setShowMessage({ show: true, text: 'Usuário encontrado com ID inválido.' });
        return null;
      }
    }
  } catch (error) {
    setShowMessage({ show: true, text: 'Erro ao obter usuário por ID: ' + error });
    return null;
  }
}

export async function updateUserById(userData: any, setShowMessage: (state: IMessage) => void
): Promise<boolean> {
  const db = getFirestore(firebaseConfig);
  try {
    const userDocRef = doc(db, 'users', userData.id);
    await runTransaction(db, async (transaction) => {
      const userDocSnapshot = await transaction.get(userDocRef);
      if (!userDocSnapshot.exists()) throw new Error('Usuário não encontrad(a)');
      transaction.update(userDocRef, userData);
    });
    setShowMessage({ show: true, text: 'Dados atualizados com sucesso!' });
    return true;
  } catch (error: unknown) {
    let errorMessage = "Erro desconhecido";
    if (error instanceof FirebaseError) {
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    setShowMessage({ show: true, text: 'Erro ao atualizar dados: ' + errorMessage });
    return false;
  }
}