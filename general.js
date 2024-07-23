const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.json(books);
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  /*const { isbn } = req.params;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.totalItems > 0) {
            const book = data.items[0].volumeInfo;
            const title = book.title;
            const authors = book.authors.join(', ');
            const publisher = book.publisher;
            // Add other relevant book details as needed

            // Send the book details in the response
            res.status(200).json({ title, authors, publisher });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }*/
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
   const { author } = req.params;
    const books = [
       {"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}},"2":{"author":"Hans Christian Andersen","title":"Fairy tales","reviews":{}},"3":{"author":"Dante Alighieri","title":"The Divine Comedy","reviews":{}},"4":{"author":"Unknown","title":"The Epic Of Gilgamesh","reviews":{}},"5":{"author":"Unknown","title":"The Book Of Job","reviews":{}},"6":{"author":"Unknown","title":"One Thousand and One Nights","reviews":{}},"7":{"author":"Unknown","title":"Njál's Saga","reviews":{}},"8":{"author":"Jane Austen","title":"Pride and Prejudice","reviews":{}},"9":{"author":"Honoré de Balzac","title":"Le Père Goriot","reviews":{}},"10":{"author":"Samuel Beckett","title":"Molloy, Malone Dies, The Unnamable, the trilogy","reviews":{}}}
    ];

    const matchingBooks = books.filter((book) => book.author === author);

    if (matchingBooks.length > 0) {
        // Send the matching books in the response
        res.status(200).json(matchingBooks);
    } else {
        res.status(404).json({ error: 'No books found for the specified author' });
    }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title.toLowerCase();
  const book = books.find(b => b.title.toLowerCase() === title);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
  /*return res.status(300).json({message: "Yet to be implemented"});*/
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books.find(b => b.isbn === isbn);

  if (book) {
    res.json(book.reviews);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
