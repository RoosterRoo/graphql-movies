import React, { Component } from 'react';
import MovieList from './components/MovieList'
import AddMovie from './components/AddMovie'
import AddActor from './components/AddActor'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
//import { getActorsQuery } from '../queries/query'


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  // constructor(props) {
  //   super(props)
  //   const data = this.props.getActorsQuery
  //   this.state = {
  //     actors: data
  //   }
  //   this.addActors = this.addActors.bind(this)
  // }
  render() {
    return (
      <ApolloProvider client={client}>
      <div id="main">
        <p>Movies List</p>
        <MovieList />
        <AddMovie />
        <AddActor />
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
