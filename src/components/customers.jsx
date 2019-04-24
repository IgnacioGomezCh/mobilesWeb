import React, { Component } from "react";
import CustomersTable from "./customersTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { Link, NavLink } from "react-router-dom";
import _ from "lodash";
import api from "../services/api";

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 6,
    sortColumn: { path: "email", order: "asc" }
  };

  componentDidMount() {
    api
      .getUsers()
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({ customers: data });
        console.log(this.state.customers);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleGetInfo = restaurant => {
    console.log(restaurant);
  };

  getPageData = () => {
    const {
      pageSize,
      sortColumn,
      currentPage,
      customers: allCustomers
    } = this.state;

    const sorted = _.orderBy(
      allCustomers,
      [sortColumn.path],
      [sortColumn.order]
    );
    const customers = paginate(sorted, currentPage, pageSize);
    return { totalCount: allCustomers.length, data: customers };
  };

  render() {
    const { length: count } = this.state.customers;
    const { pageSize, sortColumn, currentPage } = this.state;

    if (count === 0) return <p>No hay usuarios en la base de datos</p>;

    const { totalCount, data: customers } = this.getPageData();

    return (
      <div>
        <p>Hay {totalCount} usuarios en la base de datos</p>
        <CustomersTable
          customers={customers}
          onInfo={this.handleGetInfo}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />

        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Customers;
