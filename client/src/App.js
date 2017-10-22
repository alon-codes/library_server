import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import BooksList from './components/BooksList';
const SERVER_URL = "http://localhost:8000";

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            books: []
        };
    }

  componentDidMount(){
    axios.get(SERVER_URL + "/books").then(response => {
        if(response.data.hasOwnProperty("result")) {
            this.setState({
                books: response.data.result
            });
        }
    });
  }

  render() {
    return <BooksList books={this.state.books} />;
  }
}

export default App;
