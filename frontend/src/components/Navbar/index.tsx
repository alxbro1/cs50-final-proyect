import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import type { User } from "../../types/user";
import styles from "./index.module.css";

export function Navbar() {
  const user = useSelector((state: { user: { user: User } }) => state.user.user);
  const location = useLocation();
  
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          Medical App
        </Link>
      </div>
      
      <div className={styles.navLinks}>
        {user && (
          <>
            {user.role === "ADMIN" ? (
              <Link to="/admin" className={styles.navLink}>
                Dashboard
              </Link>
            ) : (
              <Link to="/appointment" className={styles.navLink}>
                Get an Appointment
              </Link>
            )}
            
            <button 
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}