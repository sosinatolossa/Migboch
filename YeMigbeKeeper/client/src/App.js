import './App.css';
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./components/user/UserProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { HabeshaFoodProvider } from './components/habeshaFood/HabeshaFoodProvider';
import { TypeProvider } from './components/type/TypeProvider';
import { FavoriteFoodProvider } from './components/favoriteFood/FavoriteFoodProvider';
import { RecipeProvider } from './components/recipe/RecipeProvider';


function App() {
  return (
    <Router>
      <UserProvider>
        <HabeshaFoodProvider>
          <TypeProvider>
            <FavoriteFoodProvider>
              <RecipeProvider>
                <Header />
                <ApplicationViews />
              </RecipeProvider>
            </FavoriteFoodProvider>
          </TypeProvider>
        </HabeshaFoodProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
