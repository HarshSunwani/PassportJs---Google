import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import LoginPage from "./Components/LoginPage/LoginPage";
import NavBar from "./Components/NavBar/NavBar";
import { userContext } from "./Context";

function App() {
  const user = useContext(userContext);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {user ? null : <Route path="/login" element={<LoginPage />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
