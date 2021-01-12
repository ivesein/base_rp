import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "@/views/login";
import Home from "@/views/home";
import About from "@/views/about";
import NotFound from "@/views/404";
export default class App extends Component {
  // 判断是否已登录
  loggedIn = () => {
    console.log(localStorage.getItem("token"));
    return localStorage.getItem("token") ? true : false;
  };
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={this.loggedIn() ? Home : Login} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
