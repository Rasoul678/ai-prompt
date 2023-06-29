import firebase_app from "../config";
import { getFirestore, doc, updateDoc, DocumentData } from "firebase/firestore";

const db = getFirestore(firebase_app);

type ArgsType = {
  collection: string;
  id: string;
  data: DocumentData;
};

export const updateDocument = async (args: ArgsType) => {
  const docRef = doc(db, args.collection, args.id);

  let result: DocumentData | null = null;
  let error = null;

  try {
    await updateDoc(docRef, args.data);
    result = args.data;
  } catch (e) {
    error = e;
  }

  return { result, error };
};
