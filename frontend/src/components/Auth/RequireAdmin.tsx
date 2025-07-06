import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userReducer";
import axios from "axios";

export function RequireAdmin({ children }: { children: React.ReactElement }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) {
      setValid(false);
      setChecking(false);
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_URL}/session/auth/validate`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch(loginUser(res.data));
          if (res.data.role === "ADMIN") {
            setValid(true);
          } else {
            setValid(false);
          }
        } else {
          localStorage.removeItem("token");
          setValid(false);
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        setValid(false);
      })
      .finally(() => setChecking(false));
  }, [token, dispatch]);

  if (checking) return null;

  if (!valid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}