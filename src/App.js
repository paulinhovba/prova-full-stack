import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">            
            
            <Link to="/" className="navbar-brand">
            <a className="navbar-brand" href="http://www.paulinhomonteiro.com" target="_blank">
              <img src={logo} width="150" height="18" alt="http://www.paulinhomonteiro.com" />
            </a>
            </Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Tarefas</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Criar Tarefa</Link>
                </li>
              </ul>
            </div>            
          </nav>
          <br/>
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
