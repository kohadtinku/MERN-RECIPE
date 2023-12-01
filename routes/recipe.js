const express = require("express");
const router = express.Router();

const Recipe = require("../model/Recipe");
const User = require("../model/Users");
const verifyToken = require("./user");

router.get("/", async (req, res) => {
  try {
    const response = await Recipe.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  const recipe = new Recipe(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.body.recipeID);
    const user = await User.findById(req.body.userID);
    user.savedRecipe.push(recipe);
    await user.save();
    res.json({ savedRecipe: user.savedRecipe });
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    res.json({ savedRecipe: user?.savedRecipe });
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    const savedRecipes = await Recipe.find({
      _id: { $in: user.savedRecipe },
    });

    res.json({ savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
