import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzx90RwgL7H1lDIF04yFebpwFJnzk739c",
  authDomain: "skillforge-3e9d4.firebaseapp.com",
  databaseURL: "https://skillforge-3e9d4-default-rtdb.firebaseio.com",
  projectId: "skillforge-3e9d4",
  storageBucket: "skillforge-3e9d4.firebasestorage.app",
  messagingSenderId: "1036150438966",
  appId: "1:1036150438966:web:9205529f7a735580cd2c97",
  measurementId: "G-N123Z5MD82"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();

export default app;