const mongoose = require('mongoose');


const petSchema = new mongoose.Schema({
   petName: {
      type: String,
      required: true,
      validate: [/^[a-zA-Z]+$/, 'Pet name must contain only english alphabetical characters!'],
      minlength: [4, 'Pet name must be at least 4 characters long!'],
   },
   breed: {
      type: String,
      required: true,
      validate: [/^[a-zA-Z\s]+$/, 'Breed must contain only english alphabetical characters!'],
      minlength: [3, 'Breed must be at least 3 characters long!'],
   },
   age: {
      type: Number,
      required: true,
      min: [0, 'Age cannot be a negative value!'],
      max: [20, 'Age cannot be over 20 years!']
   },
   type: {
      type: String,
      required: true,
      enum: ['CAT', 'DOG', 'PARROT', 'SNAKE']
   },
   imageURL:{
      type: String,
      required: true,
      validate: [/^https?:\/\//i, "The image URL is invalid!"],
   },
   owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
   }
});


const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;