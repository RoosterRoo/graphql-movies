import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getMoviesQuery } from '../queries/query'



class MovieList extends Component {
  displayMovies() {
    const data = this.props.data
    console.log(this.props);
    if(data.loading) {
      return (<li>Loading Movies....</li>)
    }else {
      return data.movies.map(movie => {
        return (<li key={ movie.id }>{ movie.name }</li>)
      })
    }
  }
  render() {
    return (
      <div>
        <ul id="movies-list">
          { this.displayMovies() }
        </ul>
      </div>
    );
  }
}

export default graphql(getMoviesQuery)(MovieList);
