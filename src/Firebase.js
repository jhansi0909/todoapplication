import { initializeApp } from "firebase/app";
import {getFirestore, getfirestore} from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBdD9z-Z8A5hg3oDJ0BYwfBdj3E3EhZ0dk",
  authDomain: "todoapplication-c90f0.firebaseapp.com",
  databaseURL: "https://todoapplication-c90f0-default-rtdb.firebaseio.com",
  projectId: "todoapplication-c90f0",
  storageBucket: "todoapplication-c90f0.appspot.com",
  messagingSenderId: "672641625005",
  appId: "1:672641625005:web:b41a7e446697507b8f4f24",
  measurementId: "G-56PHWSXJZG"
};
const database = getDatabase(app);
export const app =  initializeApp(firebaseConfig);
export default database;
export const auth = getAuth(app);
// export const auth = getAuth(app);

