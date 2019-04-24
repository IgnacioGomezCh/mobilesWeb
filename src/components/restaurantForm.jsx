import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import api from "../services/api";

class RestaurantForm extends Form {
  state = {
    data: {
      name: "",
      food: "",
      schedule: "",
      cost: "",
      contactInfo: "",
      x: "",
      y: ""
    },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Nombre"),
    food: Joi.string()
      .required()
      .label("Tipo de comida"),
    schedule: Joi.string()
      .required()
      .label("Horario"),
    contactInfo: Joi.number()
      .required()
      .label("Informacion de Contacto"),
    cost: Joi.number()
      .required()
      .min(0)
      .max(2)
      .label("Costo"),
    x: Joi.number()
      .required()
      .label("Coordenada X"),
    y: Joi.number()
      .required()
      .label("Coordenada Y")
  };

  doSubmit = () => {
    const { name, food, schedule, cost, contactInfo, x, y } = this.state.data;
    const costINT = parseInt(cost, 10);
    api.addRestaurant(name, food, schedule, contactInfo, costINT, x, y);
    this.props.history.replace("/restaurants");
  };

  render() {
    return (
      <div>
        <h1>Nuevo Restaurante</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Nombre")}
          {this.renderInput("food", "Tipo de Comida")}
          {this.renderInput("schedule", "Horario")}
          {this.renderInput("contactInfo", "Informacion de Contacto")}
          {this.renderInput("cost", "Costo")}
          {this.renderInput("x", "X")}
          {this.renderInput("y", "Y")}
          {this.renderButton("Guardar")}
        </form>
      </div>
    );
  }
}

export default RestaurantForm;
