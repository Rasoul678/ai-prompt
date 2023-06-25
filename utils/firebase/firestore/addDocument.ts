import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

type ArgsType = {
  colllection: string;
  id: string;
  data: any;
};

export const addDocument = async (args: ArgsType) => {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, args.colllection, args.id), args.data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
};
