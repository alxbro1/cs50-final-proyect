import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterForm } from "./pages/Register/Register";
import { AppoimentForm } from "./pages/Client";
import { LoggInForm } from "./pages/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoggInForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/appointment" element={<AppoimentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
