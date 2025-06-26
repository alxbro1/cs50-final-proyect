import { Formik, Form, Field } from "formik";
import { sendLogInData } from "../../helpers/sendLogInData";
import { validateLoginForm } from "../../helpers/validateLogin";
import { useDispatch } from "react-redux";
import { addAppointments } from "../../redux/appoinmentReducer";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import "./calendar.css";
import { FaUser } from "react-icons/fa";
import type { User } from "../../types/user";
import { useEffect, useState } from "react";
import { getProfessionals } from "../../helpers/getProfessionals";
import type { Professional } from "../../types/profesional";
import { SelectWithIcon } from "../../components/Input/SelectWithIcon";
import Calendar from "react-calendar";

export const AppoimentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
    getProfessionals().then(setProfessionals).catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h1>Get Your Appointment Here</h1>
        <br />
        <Formik
          initialValues={{ email: "", password: "", professionalId: "" }}
          validate={validateLoginForm}
          onSubmit={async (values) => {
            try {
              const data: User = await sendLogInData(values);
              if (data.id && !data.isVerified)
                throw Error("User is not verified");
              setTimeout(() => {
                dispatch(addAppointments(data.appointments));
                navigate("/");
              }, 2000);
            } catch (err) {
              console.error("Login failed:", err);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className={styles.formulary}>
              <Field
                name="professionalId"
                component={SelectWithIcon}
                placeholder="Select a Professional"
                icon={FaUser}
                color={false}
                options={professionals.map((prof) => ({
                  value: prof.id,
                  label: prof.name,
                }))}
                value={values.professionalId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setFieldValue("professionalId", e.target.value);
                }}
                required
              />
              <Calendar
                className="customCalendar"
              />
              <button type="submit" className={styles.button}>Get Appointment</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
