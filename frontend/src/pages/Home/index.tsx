import { useEffect, useState } from "react";
import { AppointmentsService } from "../../helpers/appoinments";
import { useDispatch, useSelector } from "react-redux";
import { addAppointments, updateAppointment } from "../../redux/appoinmentReducer";
import type { User } from "../../types/user";
import type { Appointment, Status } from "../../types/appoinment";
import { AppointmentStatus } from "../../types/appoinment";
import styles from "./index.module.css";

export function Home() {
  const user = useSelector(
    (state: { user: { user: User } }) => state.user.user
  );
  const appointments = useSelector(
    (state: { appointments: { appointments: Appointment[] } }) => state.appointments.appointments
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.id) return;
      setIsLoading(true);
      setError(null);
      try {
        const response = await AppointmentsService.getByUserId(user.id);
        dispatch(addAppointments(response));
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [user?.id, dispatch]);

  const handleCancelAppointment = async (appointmentId: number) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      setIsLoading(true);
      try {
        await AppointmentsService.updateStatus(appointmentId, AppointmentStatus.CANCELLED);
        dispatch(updateAppointment({ 
          id: appointmentId, 
          status: AppointmentStatus.CANCELLED 
        }));
      } catch (error) {
        console.error("Error cancelling appointment:", error);
        setError("Failed to cancel appointment. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (hour: number) => {
    return `${hour}:00`;
  };

  const getStatusBadgeClass = (status: Status) => {
    switch (status) {
      case AppointmentStatus.CONFIRMED:
        return styles.statusConfirmed;
      case AppointmentStatus.PENDING:
        return styles.statusPending;
      case AppointmentStatus.CANCELLED:
        return styles.statusCancelled;
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Appointments</h1>
      
      {isLoading && <p className={styles.loadingText}>Loading appointments...</p>}
      {error && <p className={styles.errorText}>{error}</p>}
      
      {appointments && appointments.length > 0 ? (
        <div className={styles.tableContainer}>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.tableHeaderCell}>Date</th>
                  <th className={styles.tableHeaderCell}>Time</th>
                  <th className={styles.tableHeaderCell}>Professional</th>
                  <th className={styles.tableHeaderCell}>Status</th>
                  <th className={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{formatDate(appointment.date)}</td>
                    <td className={styles.tableCell}>{formatTime(appointment.hour)}</td>
                    <td className={styles.tableCell}>
                      {appointment.professional ? (
                        <div>
                          <div className={styles.professionalName}>{appointment.professional.name}</div>
                        </div>
                      ) : "N/A"}
                    </td>
                    <td className={styles.tableCell}>
                      <span className={`${styles.statusBadge} ${getStatusBadgeClass(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      {appointment.status !== AppointmentStatus.CANCELLED && (
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          disabled={isLoading}
                          className={styles.actionButton}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className={styles.emptyStateContainer}>
          <p className={styles.emptyStateText}>You don't have any appointments yet.</p>
          <button className={styles.bookButton}>
            Book an Appointment
          </button>
        </div>
      )}
    </div>
  );
}
