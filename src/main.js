import { createApp, watchEffect } from 'vue'
import App from './App.vue'
import router from './router.js'
import { initializeApp } from 'firebase/app';

import { GoogleAuthProvider, signInWithPopup, getAuth ,setPersistence,browserLocalPersistence , sendPasswordResetEmail, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from 'firebase/auth';
//firestore
import { getFirestore, orderBy, collection, getDocs, addDoc, query, where, updateDoc, onSnapshot, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { ref,getDownloadURL, getStorage, uploadBytes } from 'firebase/storage';
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
export {db}

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
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('La persistencia de la sesión está configurada para el almacenamiento local del navegador.');
  })
  .catch((error) => {
    console.error('Error al configurar la persistencia de la sesión:', error);
  });
const userFromLocalStorage = localStorage.getItem('user');
if (userFromLocalStorage) {
  const user = JSON.parse(userFromLocalStorage);
  app.config.globalProperties.$currentUser = user;
}

// Escucha los cambios en el estado de autenticación
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Usuario autenticado, guarda la información del usuario en el almacenamiento local
    localStorage.setItem('user', JSON.stringify(user));
    app.config.globalProperties.$currentUser = user;
  } else {
    // Usuario no autenticado, elimina la información del usuario del almacenamiento local
    localStorage.removeItem('user');
    app.config.globalProperties.$currentUser = null;
  }
});
app.use(firebaseApp)
app.mount('#app')

const storage = getStorage(firebaseApp);

// Función para subir una imagen al almacenamiento de Firebase
export const uploadImage = async (file) => {
  console.log(file)
  try {
    const storageRef = ref(storage, `profile_images/${file.name}`); // Referencia al lugar donde se almacenará la imagen
    await uploadBytes(storageRef, file); // Subir la imagen al almacenamiento
    const downloadURL = await getDownloadURL(storageRef); // Obtener la URL de descarga de la imagen
    return downloadURL;
  } catch (error) {
    throw new Error('Error al subir la imagen: ' + error.message);
  }
};
export const getMensajes = async () => {
  const mensajesCollection = collection(db, 'mensajes');
  const mensajesSnapshot = await getDocs(mensajesCollection);
  return mensajesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
export const addMensaje = async (mensaje) => {
  const mensajesCollection = collection(db, 'mensajes');
  return await addDoc(mensajesCollection, mensaje);
}

export const getCollection = (c, q) => {
  const documents = ref(null)

  // collection reference
  const colRef = collection(db, c)

  if (q) {
    console.log(...q)
    colRef.value = query(colRef, where(...q))
  }
  const colRef1 = query(colRef, orderBy("createdAt", "desc"))
 
  const unsub = onSnapshot(colRef1, snap => {
    //console.log(snap)
    let results = []
    snap.docs.forEach(doc => {
      // must wait for the server to create the timestamp & send it back
      // we don't want to edit data until it has done this
      doc.data().createdAt && results.push({...doc.data(), id: doc.id})
    });
    
    // update values
    documents.value = results
  })


  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents }
}
//obtener la imagen de perfil por el email
export const getProfileImage = async () => {
  if (!auth.currentUser) {
    console.log('No hay usuario autenticado');
    return null;
  }

  const personasCollection = collection(db, 'personas');
  const q = query(personasCollection, where('Email', '==', auth.currentUser.email));
  const querySnapshot = await getDocs(q);

  let foto = '';
  querySnapshot.forEach((doc) => {
    foto = doc.data().FotoPerfilURL;
  });

  return foto;
};
//si hay cualquier cambio en la base de datos se actualiza
onSnapshot(collection(db, 'ideas'), () => {
  listenToIdeas();
});

//logout
export const logout = () => {
  return auth.signOut();
}
// export const getProfileImage = async () => {
//   const auth = getAuth();
//   if (!auth.currentUser) {
//     throw new Error('No hay usuario autenticado');
//   }

//   const storageRef = ref(storage, `profile_images/${auth.currentUser.uid}`); // Ruta de almacenamiento de la imagen de perfil
//   const url = await getDownloadURL(storageRef); // Obtiene la URL de descarga de la imagen
//   return url;
// };

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};
// he olvidado mi contraseña
export const forgetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
}
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
//conseguir todas las personas
export const getPersonas = async () => {
  const personasCollection = collection(db, 'personas');
  const personasSnapshot = await getDocs(personasCollection);
  return personasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

//conseguir los datos de ti mismo
export const getPersonaByEmail = async () => {
  if (!auth.currentUser) {
  console.log('No hay usuario autenticado');
  return null;
}



const personasCollection = collection(db, 'personas')
const q = query(personasCollection, where('Email', '==', auth.currentUser.email))
const querySnapshot = await getDocs(q)

let persona = null;
querySnapshot.forEach((doc) => {
  persona = { id: doc.id, ...doc.data() };
});

return persona;
  
  
}
//conseguir los datos de otra persona que soy yo por su email
export const getOtraPersonaByEmail = async (email) => {
  const personasCollection = collection(db, 'personas')
  console.log(email)
const q = query(personasCollection, where('Email', '==', email))
const querySnapshot = await getDocs(q)

let persona = null;
querySnapshot.forEach((doc) => {
  persona = { id: doc.id, ...doc.data() };
});

return persona;
}
//Actualizar mi perfil



export const updateProfile = async (id, user) => {
  
  await updateDoc(doc(db, 'personas', id), user);
};
//login google
export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};


//conseguir los datos de una persona por su id
export const getPersonaById = async (id) => {
  const personaDoc = doc(db, 'personas', id);
  const personaSnapshot = await getDoc(personaDoc);
  if (personaSnapshot.exists()) {
    return { id: personaSnapshot.id, ...personaSnapshot.data() };
  } else {
    console.log('No such document!');
  }
};
export const isAuthenticated = () => {
  return auth.currentUser !== null;
};
export const getNameById = async (id) => {
  // sacar el nombre de un usuario por su id dado en un comentario
  const personasCollection = collection(db, 'personas');

  const q = query(personasCollection, where('Id', '==', id));
  const querySnapshot = await getDocs(q);
  let nombre = '';
  querySnapshot.forEach((doc) => {
    nombre = doc.data().Nombre
  })
  return nombre

}
export const getNombreByEmail = async () => {
  if (!auth.currentUser) {
    console.log('No hay usuario autenticado');
    return '';
  }

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
export const getPersonIdeas = async (email) => {
  // Asegúrate de que hay un usuario autenticado
  if (!auth.currentUser) {
    console.log('No hay usuario autenticado');
    return [];
  }

   // Obtiene el UUID del usuario actual
  const ideasCollection = collection(db, 'ideas');
  const q = query(ideasCollection, where('EmailUsuario', '==', email)); // Filtra por idUsuario
  const ideasSnapshot = await getDocs(q);
  return ideasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const getEmail = async () => {
  if (!auth.currentUser) {
    console.log('No hay usuario autenticado');
    return '';
  }

  return auth.currentUser.email;
}
//deleteFollower cogiendo su email
export const deleteFollowerByEmail = async (emailUsuario, emailAmigo) => {
  const personasCollection = collection(db, 'personas');
  const q = query(personasCollection, where('Email', '==', emailAmigo));
  const querySnapshot = await getDocs(q);
  let id = '';
  querySnapshot.forEach((doc) => {
    id = doc.id;
  });
  const personaDoc = doc(db, 'personas', id);
  const persona = await getDoc(personaDoc);
  const seguidores = persona.data().Seguidores || [];
  const index = seguidores.indexOf(emailUsuario);
  if (index > -1) {
    seguidores.splice(index, 1);
  }
  await updateDoc(personaDoc, { Seguidores: seguidores });
}
//getAllMessages
export const getAllMessages = async () => {
  const mensajesCollection = collection(db, 'mensajes');
  const mensajesSnapshot = await getDocs(mensajesCollection);
  return mensajesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
//addMessage
export const addMessage = async (mensaje) => {
  const mensajesCollection = collection(db, 'mensajes');
  return await addDoc(mensajesCollection, mensaje);
}

//deleteSeguidos cogiendo su email
export const deleteSeguidos = async (emailUsuario, emailAmigo) => {
  const personasCollection = collection(db, 'personas');
  const q = query(personasCollection, where('Email', '==', emailUsuario));
  const querySnapshot = await getDocs(q);
  let id = '';
  querySnapshot.forEach((doc) => {
    id = doc.id;
  });
  const personaDoc = doc(db, 'personas', id);
  const persona = await getDoc(personaDoc);
  const seguidos = persona.data().Seguidos || [];
  const index = seguidos.indexOf(emailAmigo);
  if (index > -1) {
    seguidos.splice(index, 1);
  }
  await updateDoc(personaDoc, { Seguidos: seguidos });
}

//addFollower cogiendo su email
export const addFollowerByEmail = async (emailUsuario, emailAmigo) => {
  const personasCollection = collection(db, 'personas');
  const q = query(personasCollection, where('Email', '==', emailAmigo));
  const querySnapshot = await getDocs(q);
  let id = '';
  querySnapshot.forEach((doc) => {
    id = doc.id;
  });
  const personaDoc = doc(db, 'personas', id);
  const persona = await getDoc(personaDoc);
  const seguidores = persona.data().Seguidores || [];
  seguidores.push(emailUsuario);
  await updateDoc(personaDoc, { Seguidores: seguidores });
};
//addSeguidos cogiendo su email
export const addSeguidos = async (emailUsuario, emailAmigo) => {
  const personasCollection = collection(db, 'personas');
  const q = query(personasCollection, where('Email', '==', emailUsuario));
  const querySnapshot = await getDocs(q);
  let id = '';
  querySnapshot.forEach((doc) => {
    id = doc.id;
  });
  const personaDoc = doc(db, 'personas', id);
  const persona = await getDoc(personaDoc);
  const seguidos = persona.data().Seguidos || [];
  seguidos.push(emailAmigo);
  await updateDoc(personaDoc, { Seguidos: seguidos });
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
  listenToIdeas();

  // Crea una subcolección 'comentarios' en el documento de la idea
  // const comentariosCollection = collection(ideaDocRef, 'comentarios');
  // await setDoc(doc(comentariosCollection, 'comentario1'), {
  //   Contenido: '¡Bienvenido a esta idea!',
  //       Fecha: new Date(),
  //       IdPersona: auth.currentUser.uid,
  //       Likes: 0,
  //       Nombre: await getNombreByEmail(),
  //       FotoUsuario: await getProfileImage()
  // });

  return ideaDocRef;
};
export const crearComentario = async (ideaId, contenido, idPersona, Nombre, fotoUsuario) => {
  if (typeof ideaId !== 'string') {
    throw new Error('ideaId debe ser una cadena');
  }

  // Comprueba si idPersona es undefined
  if (idPersona === undefined) {
    // Si idPersona es undefined, obtén el UUID del usuario actual
    idPersona = await getUUID();
  }

  // Comprueba si responder es undefined
  if (Nombre === undefined) {
    // Si responder es undefined, asigna un valor por defecto
    Nombre = 'Valor por defecto'; // Reemplaza 'Valor por defecto' con el valor que desees
  }

  const comentario = {
    Contenido: contenido,
    Fecha: new Date(),
    IdPersona: idPersona,
    Nombre: Nombre,
    Likes: 0,
    FotoUsuario: fotoUsuario
  };

  const comentariosCollection = collection(db, 'ideas', ideaId, 'comentarios');
  const comentarioDocRef = await addDoc(comentariosCollection, comentario);

  return comentarioDocRef;
};


