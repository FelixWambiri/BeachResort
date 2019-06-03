import React from 'react';
import  './App.css';
import Home from  './pages/Home';
import Rooms from  './pages/Rooms';
import SingleRoom from  './pages/SingleRoom';
import Error from  './pages/Error';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUpPage from './components/signup/SignUpPage';
import SignInPage from './components/signin/SignInPage';
import { withAuthentication } from './session';
import PasswordForgetPage from './PasswordForget';

function App(){
  return (
    <>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/rooms/" component={Rooms}/>
        <Route exact path="/rooms/:slug" component={SingleRoom}/>
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/pass_forget" component={PasswordForgetPage} />
        <Route component={Error}/>
      </Switch>
    </>
  );
}

export default withAuthentication(App);
