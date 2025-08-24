import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import "./calendar.css";
import { FaUser } from "react-icons/fa";
import { useEffect, useState, useCallback, useMemo } from "react";
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
  const [isLoadingHours, setIsLoadingHours] = useState(false);
  const [busyHoursCache, setBusyHoursCache] = useState<Record<string, { hours: number[], timestamp: number }>>({});
  
  // Memoize available hours calculation
  const availableHours = useMemo(() => {
    return hours.filter(hour => !busyHours.includes(hour));
  }, [busyHours]);

  // Cache expiration time (5 minutes)
  const CACHE_EXPIRATION_MS = 5 * 60 * 1000;
  
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

    const dateStr = date.toISOString().split("T")[0];
    const cacheKey = `${professionalId}-${dateStr}`;
    
    // Check cache first (with expiration)
    const cachedData = busyHoursCache[cacheKey];
    if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_EXPIRATION_MS) {
      setBusyHours(cachedData.hours);
      return;
    }

    setIsLoadingHours(true);
    try {
      const busy = await AppointmentsService.getBusyHours(professionalId, dateStr);
      setBusyHours(busy);
      
      // Cache the result with timestamp
      setBusyHoursCache(prev => ({
        ...prev,
        [cacheKey]: {
          hours: busy,
          timestamp: Date.now()
        }
      }));
    } catch {
      setBusyHours([]);
      console.error("Failed to fetch busy hours");
    } finally {
      setIsLoadingHours(false);
    }
  }, [busyHoursCache, CACHE_EXPIRATION_MS]);

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
              
              // Clear cache for the relevant date to ensure fresh data
              const dateStr = values.date.toISOString().split("T")[0];
              const cacheKey = `${values.professionalId}-${dateStr}`;
              setBusyHoursCache(prev => {
                const newCache = { ...prev };
                delete newCache[cacheKey];
                return newCache;
              });
              
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
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    {isLoadingHours ? (
                      <div style={{ 
                        padding: "8px 16px", 
                        fontStyle: "italic", 
                        color: "#666" 
                      }}>
                        Loading available times...
                      </div>
                    ) : (
                      availableHours.length > 0 ? (
                        availableHours.map((hour) => (
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
                          ))
                      ) : (
                        <div style={{ 
                          padding: "8px 16px", 
                          fontStyle: "italic", 
                          color: "#888",
                          backgroundColor: "#f8f9fa",
                          borderRadius: 4,
                          border: "1px solid #e9ecef"
                        }}>
                          No available time slots for this date. Please select another date.
                        </div>
                      )
                    )}
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
