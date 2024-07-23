const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
    const user = users.find(user => user.username === username && user.password === password);
    return !!user;
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Authenticate the user
  if (authenticatedUser(username, password)) {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token });
  } else {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const { isbn } = req.params;
  const { review } = req.body;
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
  };
    const { username } = decoded;

    // Find the book by ISBN
    const book = books.find(book => book.isbn === isbn);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Add or update the review
    const userReview = book.reviews.find(r => r.username === username);
    if (userReview) {
      userReview.comment = review;
    } else {
      book.reviews.push({ username, comment: review });
    }

    return res.status(200).json({ message: 'Review added/updated successfully' });
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users ;
