import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

type ArgsType = {
  collection: string;
  id: string;
};

export const getDocument = async <T>(args: ArgsType) => {
  const docRef = doc(db, args.collection, args.id);

  let result: T | null = null;
  let error = null;
  let exists = null;

  try {
    const document = await getDoc(docRef);
    exists = document.exists;
    result = { ...document.data(), _id: document.id } as T;
  } catch (e) {
    error = e;
  }

  return { result, error, exists };
};
