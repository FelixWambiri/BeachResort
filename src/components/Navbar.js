import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaAlignRight } from 'react-icons/fa';
import logo from '../images/logo.svg';
import SignOutButton from './signout';
import { AuthUserContext } from '../session';

class Navbar extends Component {
  state = {
    isOpen: false,
  }

  handleToggle= () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  };
  render() {
    return <nav className="Navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img src={logo} alt="Beach  Resort"/>
          </Link>
          <button
          type="button"
          className="nav-btn"
          onClick={this.handleToggle}
          >
            <FaAlignRight className="nav-icon"/>
          </button>
        </div>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser ? <NavigationAuth state={this.state} /> : <NavigationNonAuth state={this.state} />
            }
          </AuthUserContext.Consumer>
      </div>
    </nav>
  }
}


const NavigationAuth = ({state}) => (
  <ul className={state.isOpen ? "nav-links show-nav" : "nav-links" }>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/rooms">Rooms</Link></li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);


const NavigationNonAuth = ({state}) =>(
  <ul className={state.isOpen ? "nav-links show-nav" : "nav-links" }>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/signin">Login</Link></li>
  </ul>
);

export default Navbar;