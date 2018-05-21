import { gql } from 'apollo-boost'

const getMoviesQuery = gql`
  {
    movies {
      name
      year
    }
  }
`;

const getActorsQuery = gql`
  {
    actors {
      name
      age
    }
  }
`;

const movieMutation = gql`
  mutation($name: String!, $year: Int!,$actorId: ID!){
    addMovie(name: $name,year: $year,actorId: $actorId){
      name
      year
    }
  }
`;

const actorMutation = gql`
  mutation($name: String!, $age: Int!){
    addActor(name: $name,age: $age){
      name
      age
    }
  }
`;

export {getMoviesQuery, getActorsQuery, movieMutation,actorMutation}
