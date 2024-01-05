"use client";

import { Calendar } from "@/atoms/calendars";
import useCalendarsState from "@/hooks/useCalendarsState";
import useCalendarsStateActions from "@/hooks/useCalendarsStateActions";
import styles from "@/styles/navbar.module.scss";
import { HTMLAttributes, useEffect } from "react";
import CheckBox from "./CheckBox";
import MiniCalendar from "./MiniCalendar";

const CalendarListItem = ({
  color,
  checked,
  name,
  onClick,
}: Calendar & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles["calendar-list-item"]}>
      <CheckBox backgroundColor={color} checked={checked} onClick={onClick} />
      <span>{name}</span>
    </div>
  );
};

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
                <CalendarListItem
                  name={calendar.name}
                  color={calendar.color}
                  checked={calendar.checked}
                  onClick={() => {
                    toggleCheckBox(calendar.name);
                  }}
                />
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
