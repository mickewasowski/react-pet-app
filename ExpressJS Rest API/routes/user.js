const router = require('express').Router();
const userService = require('../services/userService');

router.post('/login', async (req, res) => {
   let {username, password} = req.body;

   try {
      let response = await userService.login(username, password);

      res.status(201).json(response);
      
   } catch (error) {
      res.status(400).json({message: error.message});
   }
});


router.post('/register', async (req, res) => {
   let {username, fullName, email, password, rePassword} = req.body;

   try {
      let response = await userService.register(username, fullName, email, password, rePassword);

      res.status(201).json(response);
   } catch (error) {
      res.status(400).json({message: error.message});  
   }
});

router.get('/:id', async (req, res) => {
   let userId = req.params.id;

   try {
      let user = await userService.getById(userId);

      res.status(302).json(user);
   } catch (error) {
      res.status(400).json({message: error.message});  
   }
});


module.exports = router;