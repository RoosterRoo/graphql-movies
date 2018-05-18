const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  name: String,
  year: Number,
  actorId: String
})

module.exports = mongoose.model('Movie',movieSchema)
