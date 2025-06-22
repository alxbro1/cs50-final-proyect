import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoggInForm } from "./pages/LogIn";
import { RegisterForm } from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoggInForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
