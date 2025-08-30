import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import firebaseConfig from "./connection";
import { doc, getFirestore, runTransaction } from "firebase/firestore";
import { IMessage } from "@/interfaces";
import { FirebaseError } from "firebase/app";

export async function createSessionImage(id: string, data: any, setShowMessage: (state: IMessage) => void) {
  const db = getFirestore(firebaseConfig);
  const storage = getStorage(firebaseConfig);
  const storageRef = ref(storage, `images/sessions/${id}/${data.name}`);
  try {
    await uploadBytes(storageRef, data);
    const downloadUrl = await getDownloadURL(storageRef);
    const sessionDocRef = doc(db, 'sessions', id);
    await runTransaction(db, async (transaction) => {
      const sessionDocSnapshot = await transaction.get(sessionDocRef);
      if (sessionDocSnapshot.exists()) {
        transaction.update(sessionDocRef, { imageUrl: downloadUrl });
      } else throw new Error("Sessão não encontrada.");
    });
    return downloadUrl;
  } catch (error: unknown) {
    let errorMessage = "Erro desconhecido";
    if (error instanceof FirebaseError) {
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    setShowMessage({ show: true, text: "Erro ao fazer upload da imagem: " + errorMessage });
    return false;
  }
}

export const deletePlayerImage = async (sessionId: string, playerId: string, imageUrl: string, setShowMessage: (state: IMessage) => void) => {
  if (!imageUrl) return;
  
  try {
    const storage = getStorage();
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    setShowMessage({ show: true, text: "Imagem removida com sucesso!" });
  } catch (error) {
    setShowMessage({ show: true, text: "Erro ao remover a imagem!" });
  }
};

export async function createProfileImage(id: string, img: any, setShowMessage: (state: IMessage) => void) {
  const db = getFirestore(firebaseConfig);
  const storage = getStorage(firebaseConfig);
  const storageRef = ref(storage, `images/users/${id}/${img.name}`);
  try {
    await uploadBytes(storageRef, img);
    const downloadUrl = await getDownloadURL(storageRef);
    const userDocRef = doc(db, 'users', id);
    await runTransaction(db, async (transaction) => {
      const userDocSnapshot = await transaction.get(userDocRef);
      if (userDocSnapshot.exists()) {
        transaction.update(userDocRef, { imageURL: downloadUrl });
      } else throw new Error("Usuário não encontrado.");
    });
    return downloadUrl;
  } catch (error: unknown) {
    let errorMessage = "Erro desconhecido";
    if (error instanceof FirebaseError) {
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    setShowMessage({ show: true, text: "Erro ao fazer upload da mídia de imagem: " + errorMessage });
    return false;
  }
}

export async function updatePlayerImage(sessionId: string, playerId: string, newImage: any, setShowMessage: (state: IMessage) => void) {
  const storage = getStorage(firebaseConfig);
  const folderRef = ref(storage, `images/sessions/${sessionId}/players/${playerId}`);
  try {
    const folderContents = await listAll(folderRef);
    for (const itemRef of folderContents.items) {
      await deleteObject(itemRef);
    }
    const newImageRef = ref(storage, `images/sessions/${sessionId}/players/${playerId}/${newImage.name}`);
    await uploadBytes(newImageRef, newImage);
    const newImageUrl = await getDownloadURL(newImageRef);
    return newImageUrl;
  } catch (error: unknown) {
    let errorMessage = "Erro desconhecido";
    if (error instanceof FirebaseError) {
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    setShowMessage({ show: true, text: "Erro ao atualizar imagem: " + errorMessage });
    return errorMessage;
  }
}