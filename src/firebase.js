import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBa8LnmFnIZJzE1_pqxoIhj3N_tQOzEIMc",
  authDomain: "fridayapp-23ece.firebaseapp.com",
  databaseURL: "https://fridayapp-23ece.firebaseio.com",
  projectId: "fridayapp-23ece",
  storageBucket: "fridayapp-23ece.appspot.com",
  messagingSenderId: "458024737387",
  appId: "1:458024737387:web:30913b0de6a92db7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export function login(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(snap => snap.user);
}
