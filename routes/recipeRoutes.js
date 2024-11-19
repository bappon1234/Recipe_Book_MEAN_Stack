const express = require("express");
const router = express.Router();

const {recipeCreate, recipeUpdate, recipeDelete, recipeGet, recipeGetAll} = require("../controller/recipeController");

router.post('/recipeCreate', recipeCreate);
router.put('/recipeUpdate/:id', recipeUpdate);
router.delete('/recipeDelete/:id', recipeDelete);
router.get('/recipeGet/:id', recipeGet);
router.get('/recipeGetAll', recipeGetAll);

module.exports = router;