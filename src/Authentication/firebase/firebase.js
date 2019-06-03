import firebase from 'firebase';

// package responsible for all authentication
import 'firebase/auth';

// Your web app's Firebase configuration
const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PROD_APP_ID,
};

//class to initialize firebase with the web app's firebase configuration
class Firebase {
  constructor(){
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(prodConfig);
    }
    this.auth = firebase.auth()
  }

  /**
   * *** Auth API ***
   * Sign up function
   * takes email and password parameters for its function
   * signature and uses an official Firebase API endpoint
   * to create a user
  */
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  /**
   * Log in function
   * takes email and password parameters and returns
   * and authenticated user on success
  */
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  /**
   * Sign out function
   * no parameters passed as Firebase knows about the currently
   * authenticated user
  */
  doSignOut = () => this.auth.signOut();

  /**
   * reset and change a password for an authenticated user
  */
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
   this.auth.currentUser.updatePassword(password);
}

export default Firebase;