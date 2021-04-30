import './App.css';
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import ApplicationViews from "./components/ApplicationViews";


function App() {
  return (
    <Router>
      <UserProvider>
        <ApplicationViews />
      </UserProvider>
    </Router>
  );
}

export default App;
