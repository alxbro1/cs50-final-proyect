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

const hours = Array.from({ length: 10 }, (_, i) => 9 + i); // 9 a 18

export const AppoimentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  useEffect(() => {
    getProfessionals().then(setProfessionals).catch(console.error);
  }, []);

  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);

  const disableSundays = ({ date }: { date: Date }) => date.getDay() === 0;

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h1>Get Your Appointment Here</h1>
        <br />
        <Formik
          initialValues={{
            date: date.toISOString().split("T")[0],
            hour: selectedTime ?? "",
            userId: "",
            professionalId: "",
            email: "",
            password: "",
          }}
          validate={validateLoginForm}
          enableReinitialize={true}
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
                options={professionals?.map((prof) => ({
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
                minDate={today}
                maxDate={oneMonthFromNow}
                tileDisabled={disableSundays}
                onChange={(value) => {
                  if (value instanceof Date) {
                    setDate(value);
                  } else if (Array.isArray(value) && value[0] instanceof Date) {
                    setDate(value[0]);
                  }
                }}
                value={date}
              />
              <div style={{ display: "flex", gap: 8 }}>
                {hours.map((hour) => (
                  <button
                    key={hour}
                    style={{
                      background: selectedTime === hour ? "#007bff" : "#eee",
                      color: selectedTime === hour ? "#fff" : "#000",
                      borderRadius: 4,
                      padding: "8px 16px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedTime(hour)}
                    type="button"
                  >
                    {hour}:00
                  </button>
                ))}
              </div>
              <button type="submit" className={styles.button}>Get Appointment</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
