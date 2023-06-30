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

// type GetArrayReturnType<T> = T extends () => (infer U)[] ? U : never;

type ArgsType<T> = {
  collection: string;
  where: string;
  needle?: string | null;
};

export const getDocumentBy = async <T>(args: ArgsType<T>) => {
  let docRef = collection(db, args.collection);
  const q = query(docRef, where(args.where, "==", args.needle));
  let result: T | null = null;
  let error = null;
  let exists = false;

  try {
    const documents = await getDocs(q);
    result = documents.docs.map((doc) => ({ ...doc.data(), _id: doc.id })) as T;
    exists = !documents.empty;
  } catch (e) {
    error = e;
  }

  return { result, error, exists };
};
