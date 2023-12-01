import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "../App.css";
import useGetUserID from "../hook/useGetUserID";
import { useCookies } from "react-cookie";

const Home = () => {
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState([]);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get("http://localhost:8000/recipe");
        setRecipe(res.data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/recipe/savedRecipes/ids/${userID}`
        );
        setSavedRecipe(res.data.savedRecipe);
        // console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();

    if (cookies.access_token) fetchSavedRecipe();
  }, []);

  const savedRecipes = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:8000/recipe",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      console.log(response);
      alert("Recipe Saved");
      setSavedRecipe(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="text-center">Recipes</h1>
      <div className="container">
        {recipe.map((recipe) => {
          return (
            <li key={recipe._id}>
              {/* {savedRecipe.includes(recipe._id) && <h1> already saved</h1>} */}
              <div>
                <h2>{recipe.name}</h2>
                <button onClick={() => savedRecipes(recipe._id)}>Save</button>
              </div>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time : {recipe.cookingTime} Min</p>
            </li>
          );
        })}
      </div>
    </>
  );
};

export default Home;
