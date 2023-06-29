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

export const getDocumentBy = async <T>(args: ArgsType) => {
  let docRef = collection(db, args.collection);
  const q = query(docRef, where(args.where, "==", args.needle));

  let result: T | null = null;
  let error = null;

  try {
    const documents = await getDocs(q);
    result = documents.docs.map((doc) => ({ ...doc.data(), _id: doc.id })) as T;
  } catch (e) {
    error = e;
  }

  return { result, error };
};
