import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { initializeApp } from 'firebase/app';
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
//firestore
import { getFirestore, collection, getDocs, addDoc, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'




const firebaseConfig = {
  apiKey: "AIzaSyARquYBRC_WbTXjUKgua_1cmt_q679aVTY",
  authDomain: "tfgredsocial-f3935.firebaseapp.com",
  projectId: "tfgredsocial-f3935",
  storageBucket: "tfgredsocial-f3935.appspot.com",
  messagingSenderId: "1023455173944",
  appId: "1:1023455173944:web:e73bfae2e86aad953d75cd"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  
  export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  export const addUser = async (persona) => {
    const ideasCollection = collection(db, 'personas');
    return await addDoc(ideasCollection, persona);
  };
  export const getUUID= async () => {
    return auth.currentUser.uid;
  } 
  export const getNombreByEmail = async () => {
    const personasCollection = collection(db, 'personas')
    const q = query(personasCollection, where('Email', '==', auth.currentUser.email))
    const querySnapshot = await getDocs(q)
    let nombre = ''
    querySnapshot.forEach((doc) => {
      nombre = doc.data().Nombre
    })
    return nombre
  }
  export const getMyIdeas = async () => {
    // Asegúrate de que hay un usuario autenticado
    if (!auth.currentUser) {
      console.log('No hay usuario autenticado');
      return [];
    }
  
    const userUid = auth.currentUser.uid; // Obtiene el UUID del usuario actual
    const ideasCollection = collection(db, 'ideas');
    const q = query(ideasCollection, where('IdUsuario', '==', userUid)); // Filtra por idUsuario
    const ideasSnapshot = await getDocs(q);
    return ideasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  export async function updateIdea(ideaId, ideaData) {
    const ideaRef = doc(db, 'ideas', ideaId);
    await updateDoc(ideaRef, ideaData);
  }
  export const deleteIdea = async (id) => {
    const ideaRef = doc(db, 'ideas', id);
    await deleteDoc(ideaRef);
  };
  export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  export const getIdeas = async () => {
    const ideasCollection = collection(db, 'ideas');
    const ideasSnapshot = await getDocs(ideasCollection);
    return ideasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  export const addIdea = async (idea) => {
    const ideasCollection = collection(db, 'ideas');
    return await addDoc(ideasCollection, idea);
  };

createApp(App)
.use(router)



.use(auth)
.use(firebaseApp)
.mount('#app')



