"use client";

import useCalendarsState from "@/hooks/useCalendarsState";
import styles from "@/styles/navbar.module.scss";
import CheckBox from "./CheckBox";
import MiniCalendar from "./MiniCalendar";
import { useEffect } from "react";
import { Calendar } from "@/atoms/calendars";
import useCalendarsStateActions from "@/hooks/useCalendarsStateActions";

export default function Navbar() {
  const [calendars, setCalendars] = useCalendarsState();
  const { add: addCalendar, toggle: toggleCheckBox } =
    useCalendarsStateActions();

  useEffect(() => {
    const data = localStorage.getItem("calendars");
    if (data) {
      const alt: Calendar[] = JSON.parse(data);
      setCalendars(alt);
    } else {
      // 없으면 기본 캘린더 추가
      addCalendar("캘린더", "#60C69A");
    }
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.main}>
          <div className={styles.title}>
            <h1>Calendar</h1>
            <button>+</button>
          </div>
          <ul className={styles["calendar-list"]}>
            {calendars.map((calendar, i) => (
              <li key={i}>
                <CheckBox
                  backgroundColor={calendar.color}
                  checked={calendar.checked}
                  onClick={() => {
                    toggleCheckBox(calendar.name);
                  }}
                />
                <span>{calendar.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles["mini-calendar"]}>
          <MiniCalendar />
        </div>
      </nav>
    </>
  );
}
