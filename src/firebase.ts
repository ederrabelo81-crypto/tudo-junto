// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Substitua pelas credenciais do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBU-fKTA-Rq8JIhY3a6sXe8SfjirxDqwwE",
  authDomain: "procura-uai.firebaseapp.com",
  projectId: "procura-uai",
  storageBucket: "procura-uai.firebasestorage.app",
  messagingSenderId: "707880233994",
  appId: "1:707880233994:web:7e705182758246b11b83f3"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços que você vai usar
export const db = getFirestore(app);
export const auth = getAuth(app);
