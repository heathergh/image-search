import firebase from 'firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyCQJyXGTwHaSW_0o65SttIYPlJ7iAmX1jc",
    authDomain: "imagesearch-94ff1.firebaseapp.com",
    databaseURL: "https://imagesearch-94ff1.firebaseio.com",
    projectId: "imagesearch-94ff1",
    storageBucket: "imagesearch-94ff1.appspot.com",
    messagingSenderId: "725155141526",
    appId: "1:725155141526:web:75561de6a5ccc2dfc66fb7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const dbRef = firebase.database().ref();


  export default dbRef;