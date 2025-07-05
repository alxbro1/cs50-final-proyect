import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterForm } from "./pages/Register/Register";
import { AppoimentForm } from "./pages/Client";
import { LoggInForm } from "./pages/LogIn";
import { AdminForm } from "./pages/Admin";
import { RequireAuth } from "./components/Auth/RequireAuth";
import { RequireAdmin } from "./components/Auth/RequireAdmin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoggInForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/appointment"
          element={
            <RequireAuth>
              <AppoimentForm />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminForm />
            </RequireAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
