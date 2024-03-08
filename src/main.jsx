import React from "react";
import ReactDOM from "react-dom/client";
import Game from "./2048_game.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
