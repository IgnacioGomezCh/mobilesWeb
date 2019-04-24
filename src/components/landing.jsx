import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import api from "../services/api";

class RestaurantForm extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {},
    signUp: true
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("E-Mail"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    const { email, password } = this.state.data;
    api.signIn(email, password).then(response => {
      if (response.status === 200) {
        this.props.history.replace("/restaurants");
      } else {
        this.setState({ signUp: false });
      }
    });
  };

  render() {
    return (
      <div>
        <h1>Login Administrador</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Nombre de Usuario o Correo")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("LogIn")}
          {!this.state.signUp ? (
            <div className="alert alert-danger m-4">
              <strong>Error!</strong> Usuario o password incorrecto
            </div>
          ) : (
            <div />
          )}
        </form>
      </div>
    );
  }
}

export default RestaurantForm;
