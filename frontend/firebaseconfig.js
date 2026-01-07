import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config (replace with your actual values)
const firebaseConfig = {
  apiKey: "AIzaSyDBiIZUFLl563aEw963LqYJNaigFT_TxMM",
  authDomain: "studio-1013059618-183af.firebaseapp.com",
  projectId: "studio-1013059618-183af",
  storageBucket: "studio-1013059618-183af.firebasestorage.app",
  messagingSenderId: "525176142626",
  appId: "1:525176142626:web:dc70995754d64d347e037b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Auth provider
export const googleProvider = new GoogleAuthProvider();

export default app;