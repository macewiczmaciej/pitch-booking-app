import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext"; 
import App from "./App";
import "./styles/index.css";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider> {/* Kontekst użytkownika */}
      <Router> {/* Główny Router */}
        <App />
      </Router>
    </UserProvider>
  </React.StrictMode>
);
