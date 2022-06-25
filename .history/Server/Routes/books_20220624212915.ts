// modules required for routing
import express from 'express';
import { CallbackError } from 'mongoose';
const router = express.Router();
export default router;

// define the book model
import book from '../Models/books';

/* GET books List page. READ */
router.get('/', (req, res, next) => 
{
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        page: 'books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    // renders the book details page with blank form
    res.render('books/details', {
      title: 'Add Book',
      page: 'books',
      books : ''
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  // instantiate a new book to add
  let newBook = new book
  ({
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre  
  });

  // insert the new book object into the database (books collection)
  book.create(newBook, (err: CallbackError) =>
  {
      if (err)
      {
        return console.error(err);
      } else 
      {
        res.redirect('/books');
      }
      
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
    // declaring and initializing id variable with id property of req object
    let id = req.params.id;

    // fetch book by id
    book.findById(id, {}, {}, (err, bookToEdit ) => {
      if (err)
      {
        console.error(err);
        res.end(err);
      };

      // show the books/details page with the data
      res.render('books/details', {
        title: 'Edit Book',
        page: 'books',
        books : bookToEdit
      });
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  // declaring and initializing id variable with id property of req object
  let id = req.params.id;

  // instantiate a new book to update
  let updatedBook = new book
  ({
    "_id": id,
    "Title": req.body.title,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre  
  });

  // update the book object in the database
  book.updateOne({"_id": id}, updatedBook, (err: CallbackError) =>
  {
      if (err)
      {
        console.error(err);
        res.end(err);
      };

      // update successful -> redirect back to books page
      res.redirect('/books');
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  // declaring and initializing id variable with id property of req object
  let id = req.params.id;

  // remove book by id
  book.remove({"_id":id}, (err : CallbackError)=>
  {
    if (err)
      {
        console.error(err);
        res.end(err);
      };

    // remove successful -> redirect back to book page  
    res.redirect('/books');
  })
});


//module.exports = router;
