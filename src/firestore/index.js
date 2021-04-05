import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCcdW7oyQw349qF-fNhYuOdPI-7_zmw1fY",
  authDomain: "sindicato-9b89b.firebaseapp.com",
  projectId: "sindicato-9b89b",
  storageBucket: "sindicato-9b89b.appspot.com",
  messagingSenderId: "717013502234",
  appId: "1:717013502234:web:a0507859545e63533784a3",
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
  window.location.reload();
}
export async function signInWithGithub() {
  const provider = new firebase.auth.GithubAuthProvider();
  await auth.signInWithPopup(provider);
  window.location.reload();
}

export function checkAuth(cb) {
  return auth.onAuthStateChanged(cb);
}

export async function logOut() {
  await auth.signOut();
  window.location.reload();
}

export async function getCollection(id) {
  const snapshot = await db.collection(id).get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(data);
}

export async function getUserLists(userId) {
  const snapshot = await db
    .collection("lists")
    .where("author", "==", userId)
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

function uploadCoverImage(file) {
  const uploadTask = storage
    .ref(`images/${file.name}-${file.lastModified}`)
    .put(file);
  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => console.log("image uploading", snapshot),
      reject,
      () => {
        storage
          .ref("images")
          .child(`${file.name}-${file.lastModified}`)
          .getDownloadURL()
          .then(resolve);
      }
    );
  });
}

export async function createList(list, user) {
  const { name, description, image } = list;
  await db.collection("lists").add({
    name,
    description,
    image: image ? await uploadCoverImage(image) : null,
    created: firebase.firestore.FieldValue.serverTimestamp(),
    author: user.uid,
    userIds: [user.uid],
    users: [
      {
        id: user.uid,
        name: user.displayName,
      },
    ],
  });
}

export async function getList(listId) {
  try {
    const list = await db.collection("lists").doc(listId).get();
    if (!list.exists) throw Error(`List doesn't exist`);
    return list.data;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
}

export async function getListTest(listId) {
  const snapshot = await db.collection("lists").doc(listId).get();

  let data;

  if (!snapshot.exists) {
    console.log("No such document!");
  } else {
    console.log("Document data:", snapshot.data());
    data = snapshot.data();
    return data;
  }

  //return snapshot.map((doc) => ({ id: doc.id, ...doc.data() }));
}
