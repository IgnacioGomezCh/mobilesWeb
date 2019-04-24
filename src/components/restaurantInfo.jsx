import React, { Component } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import queryString from "query-string";

class RestaurantInfo extends Component {
  state = { id: this.props.match.params.id, restaurant: null, name: "" };

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
        console.log(rest);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleCost = cost => {
    switch (cost) {
      case 0:
        return "Barato";
      case 1:
        return "Normal";
      case 2:
        return "Caro";
    }
  };

  handleScore = board => {
    let pos = 0;
    let res = 0;
    do {
      res += parseInt(board[pos]);
      pos++;
    } while (pos <= board.length - 1);
    res = res / board.length;
    return res.toFixed(2);
  };

  handleEdit = () => {
    this.props.history.replace(`/restaurants/${this.state.id}/update`);
  };

  handleDelete = () => {
    api.delRestaurant(this.state.id);
    this.props.history.replace("/restaurants");
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.restaurant !== null ? (
            <h1>{this.state.restaurant[0].name}</h1>
          ) : null}
          {this.state.restaurant !== null ? (
            <h4 style={{ marginTop: "20px" }}>
              Informacion de Contacto: {this.state.restaurant[0].contactInfo}
            </h4>
          ) : null}
          {this.state.restaurant !== null ? (
            <h4 style={{ marginTop: "20px" }}>
              Costo: {this.handleCost(this.state.restaurant[0].cost)}
            </h4>
          ) : null}
          {this.state.restaurant !== null ? (
            <h4 style={{ marginTop: "20px" }}>
              Tipo de Comida: {this.state.restaurant[0].food}
            </h4>
          ) : null}
          {this.state.restaurant !== null ? (
            <h4 style={{ marginTop: "20px" }}>
              Horario: {this.state.restaurant[0].schedule}
            </h4>
          ) : null}
          {this.state.restaurant !== null ? (
            <h4 style={{ marginTop: "20px" }}>
              Puntuacion: {this.handleScore(this.state.restaurant[0].score)}
            </h4>
          ) : null}
          <div style={{ display: "flex" }}>
            <button
              style={{ marginTop: "20px", marginRight: "20px" }}
              className="btn btn-primary"
              onClick={this.handleEdit}
            >
              Editar
            </button>
            <button
              style={{ marginTop: "20px" }}
              className="btn btn-danger"
              onClick={this.handleDelete}
            >
              Borrar
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RestaurantInfo;
