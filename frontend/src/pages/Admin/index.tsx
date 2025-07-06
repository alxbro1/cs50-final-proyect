import { Formik, Form, Field } from "formik";
import styles from "./index.module.css";
import { FaUser } from "react-icons/fa";
import { useEffect } from "react";
import { createProfessional } from "../../helpers/getProfessionals";
import type { ProfessionalFormValues } from "../../types/profesional";
import { validateProfessional } from "../../helpers/validateProfesionals";
import { InputWithIcon } from "../../components/Input/Input";
import FieldsTable from "../../components/FieldsTable";
import axios from "axios";
import type { Appointment } from "../../types/appoinment";

export const AdminForm = () => {
  useEffect(() => {}, []);

  const handleAppointmentStatusChange = async (
    newValue: unknown,
    row: unknown,
    fieldName: string
  ) => {
    try {
      const appointment = row as Appointment; 
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/appointments/${appointment.id}`,
        { [fieldName]: newValue },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h1>Admin Professionals</h1>
        <FieldsTable name="professionals" />
        <Formik
          initialValues={{ name: "" }}
          validate={validateProfessional}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const newProfessional: ProfessionalFormValues = {
                name: values.name,
              };
              await createProfessional(newProfessional);
              resetForm();
              window.location.reload();
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
        <br />
        <hr/>
        <br />
        <h1>Admin Users</h1>
        <FieldsTable name="users" />
        <br />
        <hr/>
        <br />
        <h1>Admin Appointment</h1>
        <FieldsTable
          name="appointments"
          onSelectChange={handleAppointmentStatusChange}
        />
      </div>
    </div>
  );
};
