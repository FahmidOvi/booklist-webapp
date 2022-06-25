/*
File Name: Books model
Author's Name: Fahmid Ovi
Student ID: 301216822
Web App Name: Favourite Book List
*/

import mongoose from 'mongoose';
const Schema = mongoose.Schema; // Schema alias

// create a model class
const BookSchema = new Schema
({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

const Model = mongoose.model('Book', BookSchema);
export default Model;
