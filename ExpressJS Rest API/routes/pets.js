const router = require('express').Router();
const petService = require('../services/petService');

//get all
router.get('/all', async (req,res) => {
   try{
   const allPets = await petService.getAll();

   res.json(allPets);
   }
   catch(error){
      res.status(500).json({message: error.message});
   }
});

//get one
router.get('/:id', async (req,res) => {
try {
   let petId = req.params.id;

   const pet = await petService.getOne(petId)

   if (pet == null) {
      return res.status(404).json({message: "Cannot find pet!"});
   }else{
      res.json(pet);
   }
   
} catch (error) {
   res.status(404).json({message: error.message});
}
});

//create one
router.post('/create', async (req,res) => {
   let {petName, breed, age, type, imageURL, userId} = req.body;

   try{
      const pet = await petService.create(petName, breed, age, type, imageURL, userId);

      res.status(201).json(pet);
   }catch(error){
      res.status(400).json({message: error.message});
   }
});

//update one
router.patch('/:id', async (req,res) => {
   
   try {
      let {petName, breed, age, type, imageURL} = req.body;

      const updated = await petService.editOne(req.params.id, {petName, breed, age, type, imageURL});

      res.status(201).json(updated);
      
   } catch (error) {
      res.status(400).json({message: error.message});
   }
});

//delete one
router.delete('/:id', async (req,res) => {
   
   try {
      await petService.deleteOne(req.params.id);

      res.status(200).json({message: "Deleted successfully!"});
   } catch (error) {
      res.status(400).json({message: error.message});
   }
});


module.exports = router;