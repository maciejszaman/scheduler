// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { createContext, ReactElement } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7X2rI2o2YjdJW38Z6KPw3LK8UhIrNipE",
  authDomain: "scheduler-c6ccf.firebaseapp.com",
  projectId: "scheduler-c6ccf",
  storageBucket: "scheduler-c6ccf.appspot.com",
  messagingSenderId: "327444786439",
  appId: "1:327444786439:web:242667a467f7f9acfde9a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const FirebaseContext = createContext({ app, db, auth });

const FirebaseProvider = ({ children }: { children: ReactElement }) => {
  return (
    <FirebaseContext.Provider value={{ app, db, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
