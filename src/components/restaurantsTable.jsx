import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

class RestaurantsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Nombre",
      content: restaurant => (
        <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
      )
    },
    { path: "food", label: "Tipo" },
    { path: "schedule", label: "Horario" }
  ];

  render() {
    const { restaurants, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={restaurants}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default RestaurantsTable;
