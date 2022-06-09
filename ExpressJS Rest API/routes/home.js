const router = require('express').Router();
const petService = require('../services/petService');


router.get('/', async (req, res) => {
   
   try {
      const topPets = await petService.getTopThree();

      res.json(topPets);

   } catch (error) {
      res.status(400).json({message: error.message});
   }
});


module.exports = router;