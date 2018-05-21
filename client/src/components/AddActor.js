import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { actorMutation,getActorsQuery } from '../queries/query'

class AddMovie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      age: 0
    }
  }
  submitForm(e) {
    e.preventDefault()
    this.props.actorMutation({
      variables: {
        name: this.state.name,
        age: this.state.age
      },
      refetchQueries: [{query: getActorsQuery}]
    })
  }
  render() {
    return (
      <form id="add-actor" onSubmit={this.submitForm.bind(this)}>
          <div className="field">
              <label>Actor Name:</label>
              <input type="text" onChange={(e) => this.setState({name: e.target.value})} />
          </div>
          <div className="field">
              <label>Age:</label>
              <input type="text" onChange={(e) => this.setState({age: e.target.value})} />
          </div>
          <button>+</button>

      </form>
    );
  }
}

export default graphql(actorMutation,{name: "actorMutation"})(AddMovie);
