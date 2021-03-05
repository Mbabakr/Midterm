let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Book = require('../models/book');

module.exports.displayBookList = (req, res, next) => {
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('book/list', {title: 'Books', BookList: bookList});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('book/add', {title: 'Add Book', book:{}})          
}

module.exports.processAddPage = (req, res, next) => {
    let newBook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": parseFloat(req.body.price)
    });

    Book.create(newBook, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book-list');
        }
    });

}

/*
Add your code here to display EDIT
*/
module.exports.displayEditPage = (req, res, next) => {
    Book.findById(req.params.id, (err, doc)=>{
        res.render('book/add', {title: 'Edit Book', book: doc});
    });
}

/*
Add your code here to process EDIT
*/
module.exports.processEditPage = (req, res, next) => {
    let newBook ={
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": parseFloat(req.body.price)
    };

    Book.findByIdAndUpdate(req.params.id, newBook, {new: true},(err, doc)=>{
        if(err)
        console.log(err);
        else
        res.redirect('/book-list');
    });
}

/*
Add your code here to perform DELETE operation
*/
module.exports.deleteBook = (req, res, next) => {
    Book.findByIdAndDelete(req.params.id, (err, doc)=>{res.redirect("/book-list/")});
}