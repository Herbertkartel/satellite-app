// src/app/lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';   // IMPORTANT: Ensure this is imported for Firestore
import { getStorage } from 'firebase/storage';     // For Firebase Storage

// REPLACE ALL PLACEHOLDERS BELOW WITH YOUR ACTUAL FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyD4155OUptKhnt5Q0XlNg_fBGAa2eOhiUs",
  authDomain: "satellite-app-e26b6.firebaseapp.com",
  projectId: "satellite-app-e26b6",
  storageBucket: "satellite-app-e26b6.firebasestorage.app",
  messagingSenderId: "803716343613",
  appId: "1:803716343613:web:c37b033a181785074a4754"
};

// Initialize Firebase app
// This ensures Firebase is initialized only once, even with Next.js hot reloading
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get the Firestore instance
const db = getFirestore(app);

// Get the Storage instance (optional, but good to have)
const storage = getStorage(app);

export { app, db, storage };