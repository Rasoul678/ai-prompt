import firebase_app from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

type ArgsType = {
  collection: string;
  id: string;
};

export const deleteDocument = async(args: ArgsType) => {
  const docRef = doc(db, args.collection, args.id);

  let error = null;

  try {
    await deleteDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { error };
};
