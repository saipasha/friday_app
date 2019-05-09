import React, { Component } from "react";
import {
  typingCredentials,
  setUserData
} from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { login } from "../../firebase";

//primer paso para miagrar a react-redux

class Login extends Component {
  onSubmit = e => {
    e.preventDefault();
    let credentials = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    this.props.setUserData(credentials.email, credentials.password);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <p>
          Tú email
          <input type="text" name="email" />
        </p>
        <p>
          Tú password
          <input type="password" name="password" />
        </p>
        <button type="submit">Entrar</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  //se encarga lo que hay en él store
  return state;
}

export default connect(
  mapStateToProps,
  { typingCredentials, setUserData }
)(Login);
