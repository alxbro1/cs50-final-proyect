import { Formik, Form, Field } from "formik";
import { sendLogInData } from "../../helpers/sendLogInData";
import { validateLoginForm } from "../../helpers/validateLogin";
import { useScreenSize } from "../../hooks/screenSize";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userReducer";
import { addAppointments } from "../../redux/appoinmentReducer";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { InputWithIcon } from "../../components/Input/Input"; 
import { FaUser } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import type { User } from "../../types/user";

export const LoggInForm = () => {
  const { width } = useScreenSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h1>
          Hello, friend!
          <br />
          want Sign In here
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validateLoginForm}
          onSubmit={async (values) => {
            Swal.fire({
              title: "Waiting for server ...",
              icon: "info",
              showConfirmButton: false,
              allowOutsideClick: false,
              customClass:{
                popup: styles.alertContainer
              }
            });

            try {
              const data: User = await sendLogInData(values);
              console.log(data.isVerified)
              if (data.id && !data.isVerified) throw Error("User is not verified");
                Swal.update({
                  title: "LogIn succesfuly",
                  icon: "success",
                  allowOutsideClick: true,
                });
              setTimeout(() => {
                dispatch(loginUser(data));
                dispatch(addAppointments(data.appointments));
                navigate("/");
                Swal.close()
              }, 2000);
            } catch (err) {
              const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
              Swal.update({
                title: errorMessage,
                icon: "error",
                allowOutsideClick: true,
                showCloseButton: true,
              });
            }
          }}>
          <Form className={styles.formulary}>
            <Field
              icon={FaUser}
              name="email"
              type="text"
              placeholder="Email"
              component={InputWithIcon}
              required
            />

            <Field
              icon={RiLock2Fill}
              name="password"
              type="password"
              placeholder="Password"
              component={InputWithIcon}
              required
            />
            <a
              href="#"
              className={styles.forgotPassword}>
              forgot your password?
            </a>

            <button type="submit">Sign In</button>

            <p className={styles.messageRegister}>
              Dont have an account? <Link to="/register">Register</Link>
            </p>
          </Form>
        </Formik>
      </div>
      {width > 425 && (
        <div className={styles.containerRight}>
          <div className={styles.logotypeContainer}>
            <img src="/IconProjectM3.svg" />
            <h2>
              Mind <br /> Wellnes
            </h2>
          </div>
          <h1>Welcome back to our virtual office!</h1>
          <p>
            Please log in to access your personalized care plan, schedule
            appointments, and connect with your mental health provider. We are
            committed to helping you achieve the best possible outcomes on your
            journey to better mental health.
          </p>
        </div>
      )}
    </div>
  );
};
