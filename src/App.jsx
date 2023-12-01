import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import CreateRecipe from "./pages/CreateRecipe";
import SaveRecipe from "./pages/SaveRecipe";
import "./App.css"
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <BrowserRouter>
    <Navbar/> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/saved-recipe" element={<SaveRecipe />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
