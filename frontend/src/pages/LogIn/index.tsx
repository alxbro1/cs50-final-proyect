import { Formik, Form, Field } from "formik";
import { useScreenSize } from "../../hooks/screenSize";
import { useDispatch } from "react-redux";
import { addAppointments } from "../../redux/appoinmentReducer";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { InputWithIcon } from "../../components/Input/Input"; 
import type { User } from "../../types/user";

export const LoggInForm = () => {
  const { width } = useScreenSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      
    </div>
  );
};
