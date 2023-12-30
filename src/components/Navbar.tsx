import styles from "@/styles/navbar.module.scss";
import CheckBox from "./CheckBox";
import MiniCalendar from "./MiniCalendar";

export default function Navbar() {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.main}>
          <div className={styles.title}>
            <h1>Calendar</h1>
            <button>+</button>
          </div>
          <ul className={styles["calendar-list"]}>
            <li>
              <CheckBox backgroundColor="#7B81F7" checked />
              <span>캘린더</span>
            </li>
            <li>
              <CheckBox backgroundColor="#EA426A" checked={false} />
              <span>대학교</span>
            </li>
          </ul>
        </div>

        <div className={styles["mini-calendar"]}>
          <MiniCalendar />
        </div>
      </nav>
    </>
  );
}
