import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
// import * as ROUTES from '../constants/routes';
import { compose } from 'recompose';
// import { SignUpLink } from '../signup/SignUpForm';
import { withFirebase } from '../../Authentication/firebase'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="wrap">
        <h6 className="form-header">Login Here</h6>
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        <input type="submit" value="Login" disabled={isInvalid} />
        <Link to="/signup" className="btn-primary btn-login">
          Register
        </Link>
        <Link to="/pass_forget" className="btn-primary btn-login">
          Forgot password?
        </Link>
        {error && <p className="error-message">{error.message}</p>}
        </form>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export { SignInForm };