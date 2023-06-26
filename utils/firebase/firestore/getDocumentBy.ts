import firebase_app from "../config";
import {
  getFirestore,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

type ArgsType = {
  collection: string;
  where: string;
  needle?: string | null;
};

export const getDocumentBy = async (args: ArgsType) => {
  let docRef = collection(db, args.collection);
  const q = query(docRef, where(args.where, "==", args.needle));

  let result = null;
  let error = null;

  try {
    result = await getDocs(q);
  } catch (e) {
    error = e;
  }

  return { result, error };
};
