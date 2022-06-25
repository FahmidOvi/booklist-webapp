/*
File Name: Index routes
Author's Name: Fahmid Ovi
Student ID: 301216822
Web App Name: Favourite Book List
*/

// modules required for routing
import express from 'express';
const router = express.Router();
export default router;

import mongoose from 'mongoose';

// define the book model
import book from '../Models/books';

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    page: 'home',
    books: ''
   });
});

//module.exports = router;
