import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import "./calendar.css";
import { FaUser } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import { getProfessionals } from "../../helpers/getProfessionals";
import type { Professional } from "../../types/profesional";
import { SelectWithIcon } from "../../components/Input/SelectWithIcon";
import { AppointmentsService } from "../../helpers/appoinments";
import Calendar from "react-calendar";
import { useSelector, useDispatch } from "react-redux";
import type { User } from "../../types/user";
import { AppointmentStatus} from "../../types/appoinment"; 
import { addAppointments } from "../../redux/appoinmentReducer";

const hours = Array.from({ length: 10 }, (_, i) => 9 + i);

export const AppoimentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: { user: {user: User} }) => state.user.user);
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [busyHours, setBusyHours] = useState<number[]>([]);
  
  const [formState, setFormState] = useState({
    date: new Date(),
    hour: 0,
    userId: user?.id ?? 0,
    professionalId: 0,
  });

  useEffect(() => {
    getProfessionals().then(setProfessionals).catch(console.error);

    const fetchAppointments = async () => {
      if (!user?.id) return;
      try {
        const response = await AppointmentsService.getByUserId(user.id);
        dispatch(addAppointments(response));
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [user?.id, dispatch]);

  const today = new Date();
  const oneMonthFromNow = new Date();
  oneMonthFromNow.setMonth(today.getMonth() + 1);

  const disableSundays = ({ date }: { date: Date }) => date.getDay() === 0;

  const fetchBusyHours = useCallback(async (professionalId: number, date: Date) => {
    if (!professionalId || !date) {
      setBusyHours([]);
      return;
    }
    try {
      const appointments = await AppointmentsService.getByProfessionalId(professionalId);
      const selectedDay = date.toISOString().split("T")[0];
      const busy = appointments
        .filter(a => new Date(a.date).toISOString().split("T")[0] === selectedDay)
        .map(a => a.hour);
      setBusyHours(busy);
    } catch {
      setBusyHours([]);
    }
  }, []);

  useEffect(() => {
    if (formState.professionalId && formState.date) {
      fetchBusyHours(Number(formState.professionalId), formState.date);
    } else {
      setBusyHours([]);
    }
  }, [formState.professionalId, formState.date, fetchBusyHours]);

  const initialValues = {
    date: today,
    hour: 0,
    userId: user?.id ?? 0,
    professionalId: 0,
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerForm}>
        <h1>Get Your Appointment Here</h1>
        <br />
        <Formik
          initialValues={initialValues}
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
          {({ setFieldValue, values }) => {
            if (
              values.professionalId !== formState.professionalId ||
              (values.date && formState.date && values.date.getTime() !== formState.date.getTime()) ||
              values.hour !== formState.hour
            ) {
              setTimeout(() => {
                setFormState(values);
              }, 0);
            }
            
            return (
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
                      setFieldValue("date", value);
                    } else if (Array.isArray(value) && value[0] instanceof Date) {
                      setFieldValue("date", value[0]);
                    }
                  }}
                  value={values.date}
                />
                {values.professionalId && values.date && (
                  <div style={{ display: "flex", gap: 8 }}>
                    {hours
                      .filter(hour => !busyHours.includes(hour))
                      .map((hour) => (
                        <button
                          key={hour}
                          style={{
                            background: values.hour === hour ? "#007bff" : "#eee",
                            color: values.hour === hour ? "#fff" : "#000",
                            borderRadius: 4,
                            padding: "8px 16px",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => setFieldValue("hour", hour)}
                          type="button"
                        >
                          {hour}:00
                        </button>
                      ))}
                  </div>
                )}
                <button type="submit" className={styles.button}>Get Appointment</button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
