/**
 * File used to provide for a well-encapsulated
 * firebase module
 */
import FirebaseContext, { withFirebase } from './context';
import Firebase from './firebase';

export default Firebase;

export { FirebaseContext, withFirebase };