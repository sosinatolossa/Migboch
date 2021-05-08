import './App.css';
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./components/user/UserProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { HabeshaFoodProvider } from './components/habeshaFood/HabeshaFoodProvider';
import { TypeProvider } from './components/type/TypeProvider';
import { FavoriteFoodProvider } from './components/favoriteFood/FavoriteFoodProvider';


function App() {
  return (
    <Router>
      <UserProvider>
        <HabeshaFoodProvider>
          <TypeProvider>
            <FavoriteFoodProvider>
              <Header />
              <ApplicationViews />
            </FavoriteFoodProvider>
          </TypeProvider>
        </HabeshaFoodProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
