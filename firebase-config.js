// firebase-config.js
// Replace this with your own Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyABaOMohXrju_OelcUQLAxlIBy809ob3uI",
  authDomain: "ysd2026-upm-tickets.firebaseapp.com",
  projectId: "ysd2026-upm-tickets",
  storageBucket: "ysd2026-upm-tickets.firebasestorage.app",
  messagingSenderId: "350674755825",
  appId: "1:350674755825:web:143f8ee11a2fb568080950",
  measurementId: "G-Y4R80MP8P2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Enable offline persistence (optional)
db.enablePersistence()
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code === 'unimplemented') {
            console.log('The current browser does not support offline persistence');
        }
    });