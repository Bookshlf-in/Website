import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAInVQihxRaSsO7x6-8sR7Ajw6Gsg_coMM",
  authDomain: "bookshlf.firebaseapp.com",
  projectId: "bookshlf",
  storageBucket: "bookshlf.appspot.com",
  messagingSenderId: "1033653751810",
  appId: "1:1033653751810:web:60ba6c5625b153210bd71b",
  measurementId: "G-BYN26V9831",
});

const storage = firebase.storage();

export {storage};
