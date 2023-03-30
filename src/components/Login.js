import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, clearAuthState } from '../actions/auth';

function Login(props) {
  useEffect(() => {
    props.dispatch(clearAuthState());
  }, []); //instead of component will unmount
  //basically cleaning existing tokens if any

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const location = useLocation(); //here we are using useLocation hook again because this uselocation hook will only get the state in react-router-dom

  //we have to convert this class to function as well

  const { error, inProgress, isLoggedin } = props.auth;
  const from = location.state || '/'; // changed this as well

  if (isLoggedin) {
    return <Navigate to={from} />;
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      props.dispatch(login(email, password));
    }
  };

  return (
    <form className="login-form">
      <span className="login-signup-header">Log In</span>
      {error && <div className="alert error-dailog">{error}</div>}
      <div className="field">
        <input
          type="email"
          placeholder="Email"
          required
          // ref={ emailInputRef}
          onChange={handleEmailChange}
          value={email}
        />
      </div>
      <div className="field">
        <input
          type="password"
          placeholder="Password"
          required
          // ref={ passwordInputRef}
          onChange={handlePasswordChange}
          value={password}
        />
      </div>
      <div className="field">
        {/* change these declarations as well onclick ones  */}
        {inProgress ? (
          <button onClick={(e) => handleFormSubmit(e)} disabled={inProgress}>
            Logging in...
          </button>
        ) : (
          <button onClick={(e) => handleFormSubmit(e)} disabled={inProgress}>
            Log In
          </button>
        )}
      </div>
    </form>
  );
}
//connecting to store to get dispatch action
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);
