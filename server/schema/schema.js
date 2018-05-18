const graphql = require('graphql')
const _ = require('lodash')
const Actor = require('../model/actor')
const Movie = require('../model/movie')

const { GraphQLObjectType,
        GraphQLString,
        GraphQLID,
        GraphQLInt,
        GraphQLSchema,
        GraphQLList,
        GraphQLNonNull} = graphql

const movies = [
  {
    name: 'Schindler\'s List',
    year: 1993,
    id: '1',
    actorId: '3'
  },
  {
    name: 'Pulp Fiction',
    year: 1994,
    id: '2',
    actorId: '2'
  },
  {
    name: 'Forrest Gump',
    year: 1994,
    id: '3',
    actorId: '1'
  }
]

const actors = [
  {
    name: 'Tom Hanks',
    age: 61,
    id: "1"
  },
  {
    name: 'Samuel L. Jackson',
    age: 69,
    id: '2'
  },
  {
    name: 'Liam Neeson',
    age: 65,
    id: '3'
  }
]

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    year: { type: GraphQLInt },
    actor: {
      type: ActorType,
      resolve(parent, args) {
        return Actor.findById(parent.actorId)
      }
    }
  })
})

const ActorType = new GraphQLObjectType({
  name: 'Actor',
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    id: { type: GraphQLID },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.findById({actorId: parent.id})
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(movies, { id: args.id })
        return Movie.findById({id: args.id})
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({})
      }
    },
    actor: {
      type: ActorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(actors, { id: args.id })
        return Actor.findById({id: args.id})
      }
    },
    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent, args) {
        //return actors
        return Actor.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addActor: {
      type: ActorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args) {
        let actor = new Actor({
          name: args.name,
          age: args.age
        })
        return actor.save()
      }
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        year: { type: GraphQLNonNull(GraphQLInt) },
        actorId: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let movie = new Movie({
          name: args.name,
          year: args.year,
          actorId: args.actorId
        })
        return movie.save()
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
