"use client";

import { Calendar } from "@/atoms/calendars";
import useCalendarsState from "@/hooks/useCalendarsState";
import useCalendarsStateActions from "@/hooks/useCalendarsStateActions";
import styles from "@/styles/navbar.module.scss";
import { FormEvent, HTMLAttributes, useEffect, useRef, useState } from "react";
import CheckBox from "./CheckBox";
import MiniCalendar from "./MiniCalendar";

const CalendarDefaultColor = "#60C69A";

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

const CreateCalendarButton = () => {
  const ref = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(CalendarDefaultColor);
  const { add } = useCalendarsStateActions();

  const [showCalendarCreateForm, setShowCalendarCreateForm] =
    useState<boolean>(false);

  useEffect(() => {
    const globalClickEvent: (this: Document, ev: MouseEvent) => any = (ev) => {
      if (ref.current && !ref.current.contains(ev.target as Element)) {
        setShowCalendarCreateForm(false);
      }
    };

    document.addEventListener("click", globalClickEvent);
    return () => {
      document.removeEventListener("click", globalClickEvent);
    };
  }, []);

  const onSubmit = (ev: FormEvent | MouseEvent) => {
    ev.preventDefault();
    setShowCalendarCreateForm(false);

    if (title.trim() === "") {
      return;
    }

    add(title, color);
    setTitle("");
    setColor(CalendarDefaultColor);
  };

  return (
    <div ref={ref}>
      <button onClick={() => setShowCalendarCreateForm((prev) => !prev)}>
        <span>+</span>
        {showCalendarCreateForm && (
          <form
            className={styles["calendar-create-form"]}
            onClick={(ev) => ev.stopPropagation()}
            onSubmit={(ev) => onSubmit(ev)}
          >
            <div
              ref={colorRef}
              style={{
                backgroundColor: `${color}`,
              }}
              onClick={() => {
                colorInputRef.current?.click();
              }}
            />
            <input
              type="text"
              placeholder="캘린더 이름"
              onChange={(ev) => setTitle(ev.target.value)}
            />
            <input
              ref={colorInputRef}
              type="color"
              onChange={(ev) => setColor(ev.target.value)}
            />
            <span
              onClick={(ev) => onSubmit(ev)}
              className="material-symbols-outlined"
            >
              done
            </span>
          </form>
        )}
      </button>
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
      addCalendar("캘린더", CalendarDefaultColor);
    }
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.main}>
          <div className={styles.title}>
            <h1>Calendar</h1>
            <CreateCalendarButton />
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
