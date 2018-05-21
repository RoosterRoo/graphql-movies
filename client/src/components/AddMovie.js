import React, { Component } from 'react';
import { graphql,compose } from 'react-apollo'
import { getActorsQuery,movieMutation,getMoviesQuery } from '../queries/query'

class AddMovie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      year: 0,
      actorId: ""
    }
  }
  displayActors() {
    const data = this.props.getActorsQuery
    if (data.loading) {
      return <option disabled>Loading Actors..</option>
    }else {
      return data.actors.map(actor => {
        return <option key={actor.id} value={actor.id}>{actor.name}</option>
      })
    }
  }
  submitForm(e) {
    e.preventDefault()
    this.props.movieMutation({
      variables: {
        name: this.state.name,
        year: this.state.year,
        actorId: this.state.actorId
      },
      refetchQueries: [{query: getMoviesQuery}]
    })
  }
  render() {
    return (
      <form id="add-movie" onSubmit={this.submitForm.bind(this)}>
          <div className="field">
              <label>Movie:</label>
              <input type="text" onChange={(e) => this.setState({name: e.target.value})} />
          </div>
          <div className="field">
              <label>Year:</label>
              <input type="text" onChange={(e) => this.setState({year: e.target.value})} />
          </div>
          <div className="field">
              <label>Actor:</label>
              <select onChange={(e) => this.setState({actorId: e.target.value})}>
                  <option>Select actor</option>
                  { this.displayActors() }
              </select>
          </div>
          <button>+</button>

      </form>
    );
  }
}

export default compose(
  graphql(getActorsQuery,{name: "getActorsQuery"}),
  graphql(movieMutation,{name: "movieMutation"})
)(AddMovie);
