import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { withFirebase } from '../../Authentication/firebase';
import { compose } from 'recompose';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/rooms/');
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };


  onChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name
    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      username,
      email,
      password,
      confirm_password,
      error,
    } = this.state;

    const isInvalid =
      password !== confirm_password ||
      password === '' ||
      email === '' ||
      username === '';

    return (
      <div className="wrap">
        <h6 className="form-header">Sign up Here</h6>
        <form onSubmit={this.onSubmit}>
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
            required
          />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
            required
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
            required
          />
          <input
            name="confirm_password"
            value={confirm_password}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
            required
          />
          <input type="submit" value="Sign In" disabled={isInvalid} />
          {error && <p className="error-message">{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);
const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export { SignUpForm, SignUpLink };