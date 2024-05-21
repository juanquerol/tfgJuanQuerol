import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { initializeApp } from 'firebase/app';
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
//firestore
import { getFirestore, collection, getDocs, addDoc, query, where, updateDoc, onSnapshot, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
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

  
  

const app = createApp(App);
const listenToIdeas = () => {
  const ideasCollection = collection(db, 'ideas');
  onSnapshot(ideasCollection, (snapshot) => {
    const ideas = [];
    snapshot.forEach((doc) => {
      ideas.push({ id: doc.id, ...doc.data() });
    });
    // Actualiza el componente App con las nuevas ideas
    app.config.globalProperties.$ideas = ideas;
  });
}

app.use(router)
app.use(auth)
app.use(firebaseApp)
app.mount('#app')


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
// export const filterIdeas = async (criteria) => {
//   const ideasCollection = collection(db, 'ideas');
//   const q = query(ideasCollection, where('Titulo', '>=', criteria)); // Filtra por el criterio proporcionado
//   const ideasSnapshot = await getDocs(q);
//   return ideasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// };
export const getPersonas = async () => {
  const personasCollection = collection(db, 'personas');
  const personasSnapshot = await getDocs(personasCollection);
  return personasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
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
export const addLikeToIdea = async (ideaId) => {
  const ideaRef = doc(db, 'ideas', ideaId);
  const ideaSnapshot = await getDoc(ideaRef);
  const ideaData = ideaSnapshot.data();
  const likes = ideaData.Likes + 1;
  await updateDoc(ideaRef, { Likes: likes });
  
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
  listenToIdeas();
}
export const deleteIdea = async (id) => {
  const ideaRef = doc(db, 'ideas', id);
  await deleteDoc(ideaRef);
  listenToIdeas();
};
//sacar los comentarios que son una subcoleccion de ideas

export async function cometariosIdea(ideaId){
  if (typeof ideaId !== 'string') {
    throw new Error('ideaId debe ser una cadena');
  }

  const comentariosCollection = collection(db, 'ideas', ideaId, 'comentarios');
  const comentariosSnapshot = await getDocs(comentariosCollection);
  return comentariosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
}

export const getIdeaById = async (ideaId) => {
  const ideaDoc = doc(db, 'ideas', ideaId);
  const ideaSnapshot = await getDoc(ideaDoc);
  if (ideaSnapshot.exists()) {
    return { id: ideaSnapshot.id, ...ideaSnapshot.data() };
  } else {
    console.log('No such document!');
  }
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
  const ideaDocRef = await addDoc(ideasCollection, idea);

  // Crea una subcolección 'comentarios' en el documento de la idea
  const comentariosCollection = collection(ideaDocRef, 'comentarios');
  await setDoc(doc(comentariosCollection, 'comentario1'), {
    Contenido: '¡Bienvenido a esta idea!',
        Fecha: new Date(),
        IdPersona: auth.currentUser.uid,
        Likes: 0,
        Responder: 'wJjLgWcd3QNY0AdSEdIo'
  });

  return ideaDocRef;
};
export const crearComentario = async (ideaId, contenido, idPersona, responder) => {
  if (typeof ideaId !== 'string') {
    throw new Error('ideaId debe ser una cadena');
  }

  // Comprueba si idPersona es undefined
  if (idPersona === undefined) {
    // Si idPersona es undefined, obtén el UUID del usuario actual
    idPersona = await getUUID();
  }

  // Comprueba si responder es undefined
  if (responder === undefined) {
    // Si responder es undefined, asigna un valor por defecto
    responder = 'Valor por defecto'; // Reemplaza 'Valor por defecto' con el valor que desees
  }

  const comentario = {
    Contenido: contenido,
    Fecha: new Date(),
    IdPersona: idPersona,
    Likes: 0,
    Responder: responder
  };

  const comentariosCollection = collection(db, 'ideas', ideaId, 'comentarios');
  const comentarioDocRef = await addDoc(comentariosCollection, comentario);

  return comentarioDocRef;
};


