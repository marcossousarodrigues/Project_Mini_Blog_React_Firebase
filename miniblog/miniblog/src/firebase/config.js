
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAU06zpqrlyIcz0o8wxgqdQLjfr2v16mGo",
  authDomain: "miniblog-bf452.firebaseapp.com",
  projectId: "miniblog-bf452",
  storageBucket: "miniblog-bf452.appspot.com",
  messagingSenderId: "66528190278",
  appId: "1:66528190278:web:dbed312e146a22e033cf47"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db};