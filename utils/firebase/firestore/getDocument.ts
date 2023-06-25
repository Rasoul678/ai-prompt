import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

type ArgsType = {
  collection: string;
  id: string;
};

export const getDocument = async (args: ArgsType) => {
  let docRef = doc(db, args.collection, args.id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
};
