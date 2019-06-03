import React from 'react';
/**
 * use React Context Api to provide firebase
 * once at the top level of my component hierarchy
 */


const FirebaseContext = React.createContext(null);


export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    { firebase => <Component {...props} firebase={firebase}/>}
  </FirebaseContext.Consumer>
)

export default FirebaseContext;
