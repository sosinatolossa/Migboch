import './App.css';
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./components/user/UserProvider";
import ApplicationViews from "./components/ApplicationViews";
import { HabeshaFoodProvider } from './components/habeshaFood/HabeshaFoodProvider';
import { TypeProvider } from './components/type/TypeProvider';


function App() {
  return (
    <Router>
      <UserProvider>
        <HabeshaFoodProvider>
          <TypeProvider>
            <ApplicationViews />
          </TypeProvider>
        </HabeshaFoodProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
