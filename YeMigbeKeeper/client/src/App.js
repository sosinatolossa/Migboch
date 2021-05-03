import './App.css';
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./components/user/UserProvider";
import ApplicationViews from "./components/ApplicationViews";
import { HabeshaFoodProvider } from './components/habeshaFood/HabeshaFoodProvider';


function App() {
  return (
    <Router>
      <UserProvider>
        <HabeshaFoodProvider>
          <ApplicationViews />
        </HabeshaFoodProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
