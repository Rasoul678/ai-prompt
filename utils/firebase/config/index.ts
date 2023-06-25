// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: String(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: String(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: String(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  ),
  appId: String(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
};

// Initialize/Get Firebase
const firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
