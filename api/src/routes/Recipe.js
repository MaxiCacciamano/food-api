const express = require('express');
const { Router } = require('express');
const router = express.Router();
const RecipeC = require('../Controls/RecipeC');

router.use(express.json());

router.get('/',RecipeC.getRecipe);
router.get('/:id',RecipeC.idRecipe);
router.post('/recipe',RecipeC.postRecipe);
router.delete('/delete/:id', RecipeC.deleteRecipe)


module.exports= router;