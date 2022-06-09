const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   username:{
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]+$/, 'Username must contain only english alphabetical characters or numeric characters!'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long!'],
   },
   fullName: {
      type: String,
      required: true,
      validate: [/^([a-zA-Z]+ [a-zA-Z]+)$|^([a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+)$/, 'Full name must contain only english alphabetical!'],
      minlength: [8, 'Full name must be at least 8 characters long!'],
   },
   email: {
      type: String,
      required: true,
      unique: true,
      validate: [/^[a-zA-Z]+@[a-zA-Z]+.[a-zA-Z]+$/, 'Email must contain only English letters!'],
   },
   password:{
      type: String,
      required: true,
      minlength: [6, 'Password must be at least 6 characters long!']
   },
   myPets: [{
      type: mongoose.Types.ObjectId,
        ref: 'Pet'
   }]
});


userSchema.pre('save', function(next) {
   bcrypt.hash(this.password, 10)
       .then(hash => {
           this.password = hash;
           
           next();
       });
});

userSchema.method('validatePassword', async function(pass){
   return await bcrypt.compare(pass, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;