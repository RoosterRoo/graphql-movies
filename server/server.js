const express = require('express')
const graphQLHTTP = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const schema = require('./schema/schema')


const app = express()

app.use(cors())

mongoose.connect('mongodb://zoro:test123@ds137435.mlab.com:37435/gql')
mongoose.connection.once('open',() => {
  console.log('Connected to the database...');
})

app.use('/graphql',graphQLHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Server listening on port 4000');
})
