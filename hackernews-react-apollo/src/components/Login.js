import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { AUTH_TOKEN } from "../constants";

const SIGNUP_USER = gql`
  mutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

class Login extends Component {
  state = {
    login: true, // flag to alternate bet. login and signup
    name: "",
    email: "",
    password: ""
  };

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  handleSubmit = async data => {
    const { token } = this.state.login ? data.login : data.signup;
    this.handleLocalStorage(token);
    this.props.history.push("/");
  };

  handleLocalStorage = token => localStorage.setItem(AUTH_TOKEN, token);

  render() {
    const { login, email, password, name } = this.state;
    return (
      <div>
        <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              name="name"
              value={name}
              onChange={this.handleChange}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            name="email"
            value={email}
            onChange={this.handleChange}
            type="text"
            placeholder="Your email address"
          />
          <input
            name="password"
            value={password}
            onChange={this.handleChange}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <Mutation
            mutation={login ? LOGIN_USER : SIGNUP_USER}
            variables={{ email, password, name }}
            onCompleted={data => this.handleSubmit(data)}
          >
            {mutation => (
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? "login" : "create account"}
              </div>
            )}
          </Mutation>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
