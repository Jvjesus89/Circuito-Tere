import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

import "./index.css";
import "./App.css";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="*" element={<h1>Página Não Encontrada (404)</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
