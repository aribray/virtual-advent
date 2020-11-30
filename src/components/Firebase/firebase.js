
import app from 'firebase/app';
import 'firebase/auth';
import "firebase/firestore";

var config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_BASEURL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// const Firebase = firebase.initializeApp(config);

// export default Firebase;

// let Firestore = "";

// Initialize Firebase
export default class Firebase {
	constructor() {
      if (!app.apps.length) {
        app.initializeApp(config);
      }

      console.log(this.app)

      this.auth = app.auth();

      const firestore = app.firestore();

      this.dbCalendar = firestore.collection("/items");
      this.dbWishlist = firestore.collection("/wishlist")

    }

    signin = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    doSignOut = () => this.auth.signOut();
}


