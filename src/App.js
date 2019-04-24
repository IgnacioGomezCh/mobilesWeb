import React, { Component } from "react";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/landing";
import Restaurants from "./components/restaurants";
import RestaurantInfo from "./components/restaurantInfo";
import RestaurantForm from "./components/restaurantForm";
import Customers from "./components/customers";
import RestaurantUpdateForm from "./components/restaurantUpdateForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/landing" component={Landing} />
            <Route path="/restaurants/new" component={RestaurantForm} />
            <Route
              path="/restaurants/:id/update"
              component={RestaurantUpdateForm}
            />
            <Route path="/restaurants/:id" component={RestaurantInfo} />
            <Route path="/restaurants" component={Restaurants} />
            <Route path="/customers" component={Customers} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/landing" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
