import { Formik, Field, Form } from "formik";
import { validationRegisterForm, type RegisterFormValues } from "../../helpers/validateRegister";
import { sendRegisterData } from "../../helpers/sendRegisterData";
import { InputWithIcon } from "../../components/Input/Input";
import {
  FaUser,
  FaRegUser,
  FaEnvelope,
  FaKey,
} from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import styles from "./index.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useScreenSize } from "../../hooks/screenSize";

export const RegisterForm = () => {
    const { width } = useScreenSize();
    const navigate = useNavigate();

    const handleSubmit = (data: RegisterFormValues) => {
      sendRegisterData(data)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.error("Registration failed:", error);
        });
    };

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h1>
          Hello, friend!
          <br />
          want Register here
        </h1>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
            nDni: 0,
            birthdate: "",
          }}
          onSubmit={handleSubmit}
          validate={validationRegisterForm}>
          {({ isSubmitting }) => (
            <Form>
              <Field
                icon={FaRegUser}
                type="text"
                name="name"
                placeholder="Name Username"
                gradientColor1="#9c7bfe"
                gradientColor2="#7141ff"
                component={InputWithIcon}
                color={true}
                required
              />

              <Field
                placeholderColor="violet"
                gradientColor1="#9c7bfe"
                gradientColor2="#7141ff"
                icon={FaUser}
                type="text"
                name="username"
                placeholder="Username"
                component={InputWithIcon}
                color={true}
                required
              />

              <Field
                placeholderColor="violet"
                gradientColor1="#9c7bfe"
                gradientColor2="#7141ff"
                icon={FaEnvelope}
                type="email"
                name="email"
                placeholder="Example@demo.com"
                component={InputWithIcon}
                color={true}
                required
              />

              <Field
                placeholderColor="violet"
                gradientColor1="#9c7bfe"
                gradientColor2="#7141ff"
                icon={FaKey}
                type="password"
                name="password"
                placeholder="··············"
                component={InputWithIcon}
                color={true}
                required
              />

              <Field
                placeholderColor="violet"
                gradientColor1="#9c7bfe"
                gradientColor2="#7141ff"
                icon={FaKey}
                type="password"
                name="confirmPassword"
                placeholder="··············"
                component={InputWithIcon}
                color={true}
                required
              />

              <p
                className={styles.forgotPassword}>
                <IoMdCheckmarkCircleOutline /> I've read and agree to{" "}
                <a
                  href="#"
                  target="blank">
                  {" "}
                  Terms & Conditions
                </a>
              </p>

              <button
                type="submit"
                disabled={isSubmitting}>
                Register
              </button>

              <p className={styles.messageRegister}>
                Do you have an account? <Link to="/login">Log In</Link>
              </p>
            </Form>
          )}
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
            appointments, and connect with your mental health provider. We're
            committed to helping you achieve the best possible outcomes on your
            journey to better mental health.
          </p>
        </div>
      )}
    </div>
  );
};
