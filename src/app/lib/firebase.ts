import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "take-home-eastern-task.firebaseapp.com",
  projectId: "take-home-eastern-task",
  storageBucket: "take-home-eastern-task.appspot.com",
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveTree = async (tree) => {
  try {
    await setDoc(doc(db, "trees", "categoryTree"), { tree });
  } catch (error) {
    console.log(error);
  }
};

export const loadTree = async () => {
  try {
    const docRef = doc(db, "trees", "categoryTree");
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as { tree }).tree : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
