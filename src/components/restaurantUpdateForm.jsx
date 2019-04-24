import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import api from "../services/api";

class RestaurantUpdateForm extends Form {
  state = {
    id: this.props.match.params.id,
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

  componentDidMount() {
    api
      .getRestaurants()
      .then(result => {
        return result.json();
      })
      .then(data => {
        const restaurant = data.filter(m => m.id === this.state.id);
        this.setState({ restaurant });
        const rest = [...restaurant];

        this.setState({ data: rest[0] });
        console.log(rest);
      })
      .catch(error => {
        console.log(error);
      });
  }

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
    contactInfo: Joi.string()
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
    const { id } = this.state;
    const { name, food, schedule, cost, contactInfo, x, y } = this.state.data;
    const costINT = parseInt(cost, 10);
    api.updateRestaurant(id, name, food, schedule, contactInfo, costINT, x, y);
    this.props.history.replace(`/restaurants/${this.state.id}`);
  };

  render() {
    console.log(this.state.id);
    return (
      <div>
        <h1>Actualizar Restaurante</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Nombre", "text", "HOLA")}
          {this.renderInput("food", "Tipo de Comida")}
          {this.renderInput("schedule", "Horario")}
          {this.renderInput("contactInfo", "Informacion de Contacto")}
          {this.renderInput("cost", "Costo")}
          {this.renderInput("x", "X")}
          {this.renderInput("y", "Y")}
          <button onClick={this.doSubmit} className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    );
  }
}

export default RestaurantUpdateForm;
