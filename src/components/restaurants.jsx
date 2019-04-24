import React, { Component } from "react";
import RestaurantsTable from "./restaurantsTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { Link, NavLink } from "react-router-dom";
import _ from "lodash";
import api from "../services/api";

class Movies extends Component {
  state = {
    restaurants: [],
    currentPage: 1,
    pageSize: 6,
    sortColumn: { path: "name", order: "asc" }
  };

  componentDidMount() {
    api
      .getRestaurants()
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({ restaurants: data });
        console.log(this.state.restaurants);
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
      restaurants: allRestaurants
    } = this.state;

    const sorted = _.orderBy(
      allRestaurants,
      [sortColumn.path],
      [sortColumn.order]
    );
    const restaurants = paginate(sorted, currentPage, pageSize);
    return { totalCount: allRestaurants.length, data: restaurants };
  };

  handleNewRest = () => {
    this.props.history.replace("/restaurants/new");
  };

  render() {
    const { length: count } = this.state.restaurants;
    const { pageSize, sortColumn, currentPage } = this.state;

    if (count === 0) return <p>No hay restaurantes en la base de datos</p>;

    const { totalCount, data: restaurants } = this.getPageData();

    return (
      <div>
        <p>Hay {totalCount} restaurantes en la base de datos</p>
        <RestaurantsTable
          restaurants={restaurants}
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
        <button className="btn btn-primary" onClick={this.handleNewRest}>
          Crear Restaurante
        </button>
      </div>
    );
  }
}

export default Movies;
