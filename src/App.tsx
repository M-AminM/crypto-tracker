import React from "react";
import { Route, Routes } from "react-router-dom";
import Coins from "./components/Coins";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";

const App: React.FunctionComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/coins/:id" element={<Coins />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
