import { Formik, Form, Field } from "formik";
import { sendLogInData } from "../../helpers/sendLogInData";
import { validateLoginForm } from "../../helpers/validateLogin";
import { useDispatch } from "react-redux";
import { addAppointments } from "../../redux/appoinmentReducer";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { FaUser } from "react-icons/fa";
import type { User } from "../../types/user";
import { useEffect, useState } from "react";
import {
  getProfessionals,
  createProfessional,
} from "../../helpers/getProfessionals";
import type {
  Professional,
  ProfessionalFormValues,
} from "../../types/profesional";
import { SelectWithIcon } from "../../components/Input/SelectWithIcon";
import { validateProfessional } from "../../helpers/validateProfesionals";
import { InputWithIcon } from "../../components/Input/Input";

export const AdminForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
    getProfessionals().then(setProfessionals).catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h1>Admin Professionals</h1>
        <br />
        <Formik
          initialValues={{ name: "" }}
          validate={validateProfessional}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const newProfessional: ProfessionalFormValues = {
                name: values.name,
              };
              const createdProfessional = await createProfessional(
                newProfessional
              );
              setProfessionals((prev) => [...prev, createdProfessional]);
              resetForm();
            } catch (error) {
              console.error("Error creating professional:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Form>
            <Field
              component={InputWithIcon}
              name="name"
              placeholder="Name"
              icon={FaUser}
              color={false}
              type="text"
            />
            <button type="submit" className={styles.button}>
              Create Professional
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
