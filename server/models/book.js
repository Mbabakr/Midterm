let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    author: String,
    published: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
