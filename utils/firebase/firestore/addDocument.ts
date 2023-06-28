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

export const addDocument = async <T>(args: ArgsType) => {
  let result: T | null = null;
  let error = null;

  try {
    if (args.id) {
      result = (await setDoc(doc(db, args.colllection, args.id), args.data, {
        merge: true,
      })) as T;
    } else {
      result = (await addDoc(collection(db, args.colllection), args.data)) as T;
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
};
