import firebase_app from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

type ArgsType = {
  colllection: string;
  id?: string;
  data: any;
};

export const addDocument = async (args: ArgsType) => {
  let result = null;
  let error = null;

  try {
    if (args.id) {
      result = await setDoc(doc(db, args.colllection, args.id), args.data, {
        merge: true,
      });
    } else {
      result = await addDoc(collection(db, args.colllection), args.data);
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
};
