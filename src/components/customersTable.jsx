import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

class CustomersTable extends Component {
  columns = [
    {
      path: "email",
      label: "E-mail"
    },
    {
      key: "user",
      content: user => (
        <h2
          style={{
            fontSize: "15px",
            color: "#045ae5",
            textDecoration: "underline"
          }}
        >
          {user.admin ? "Administrador" : "Usuario Normal"}{" "}
        </h2>
      )
    }
  ];

  render() {
    const { customers, onSort, sortColumn } = this.props;
    return (
      <Table
        id={this.props.email}
        columns={this.columns}
        data={customers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomersTable;
