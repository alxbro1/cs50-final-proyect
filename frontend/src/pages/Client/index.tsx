import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import "./calendar.css";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getProfessionals } from "../../helpers/getProfessionals";
import type { Professional } from "../../types/profesional";
import { SelectWithIcon } from "../../components/Input/SelectWithIcon";
import { AppointmentsService } from "../../helpers/appoinments";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import type { User } from "../../types/user";
import { AppointmentStatus} from "../../types/appoinment"; 

const hours = Array.from({ length: 10 }, (_, i) => 9 + i);

export const AppoimentForm = () => {
  const navigate = useNavigate();
  const user = useSelector((state: { user: {user: User} }) => state.user.user);
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
            date: date,
            hour: selectedTime ?? 0,
            userId: user?.id ?? 0,
            professionalId: 0,
          }}
          enableReinitialize={true}
          onSubmit={async (values) => {
            try {
              if (user.id === null || user.id === undefined) throw new Error("User ID is required");
              if (typeof values.professionalId !== "number" || values.professionalId <= 0) values.professionalId = Number(values.professionalId);
              const appointmentData = {
                userId: user.id,
                professionalId: values.professionalId,
                date: values.date,
                hour: values.hour,
                status: AppointmentStatus.PENDING
              };
              await AppointmentsService.create(appointmentData);
              navigate("/");
            } catch (err) {
              console.error("Appointment creation failed:", err);
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
