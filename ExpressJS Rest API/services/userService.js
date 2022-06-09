const User = require('../models/User');
const {} = require('../utils/jwtUtils');

exports.register = async function(username, fullName, email, password, rePassword){

   if (password != rePassword) {
      throw new Error('Passwords do not match');
   }

   return await User.create({username, fullName, email, password});
};


exports.login = async function(username, password){
   let user = await User.findOne({username});

   if (user == null) {
      throw new Error('User with this username not found!');
   }

   let isValid = await user.validatePassword(password);

   if (!isValid) {
      throw new Error('Username or password incorrect!');
   }

   const userDetails = {
      userId: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName
   };

   return userDetails;
};

exports.getById = async function(userId){
   let user = await User.findById({_id: userId})
      .populate('myPets');

   return user;
}