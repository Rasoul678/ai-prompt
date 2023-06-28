import firebase_app from "../config";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const db = getFirestore(firebase_app);

type Args = {
  collectionName: string;
};

export const getCollection = async <T>(args: Args) => {
  const colRef = collection(db, args.collectionName);

  let result: T | null = null;
  let error = null;

  try {
    const collections = await getDocs(colRef);
    result = collections.docs.map((doc) => ({
      ...doc.data(),
      _id: doc.id,
    })) as T;
  } catch (e) {
    error = e;
  }

  return { result, error };
};
