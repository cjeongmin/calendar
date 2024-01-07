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
  onDoubleClick,
}: Calendar & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles["calendar-list-item"]} onDoubleClick={onDoubleClick}>
      <CheckBox
        backgroundColor={color}
        checked={checked}
        onClick={onClick}
        onDoubleClick={(ev) => ev.stopPropagation()}
      />
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

    add({ name: title, color, checked: true });
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

const UpdaterModal = ({
  name,
  color,
  checked,
  onCancel,
  onSubmit,
}: Calendar & { onCancel?: () => void; onSubmit?: () => void }) => {
  return (
    <div
      className={styles.modal}
      onClick={() => {
        onCancel === undefined ? () => {} : onCancel();
      }}
    >
      <div className={styles.content} onClick={(ev) => ev.stopPropagation()}>
        {name} {color}
      </div>
    </div>
  );
};

export default function Navbar() {
  const [calendars, setCalendars] = useCalendarsState();
  const {
    add: addCalendar,
    toggle: toggleCalendarVisibility,
    remove: removeCalendar,
  } = useCalendarsStateActions();

  const [selectedCalendar, setSelectedCalendar] = useState<Calendar | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("calendars");
    if (data) {
      const alt: Calendar[] = JSON.parse(data);
      setCalendars(alt);
    } else {
      // 없으면 기본 캘린더 추가
      addCalendar({
        name: "캘린더",
        color: CalendarDefaultColor,
        checked: true,
      });
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
                  {...calendar}
                  onClick={() => {
                    toggleCalendarVisibility(calendar.name);
                  }}
                  onDoubleClick={() => {
                    setShowModal(true);
                    setSelectedCalendar(calendar);
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

      {showModal && selectedCalendar !== null ? (
        <UpdaterModal
          onCancel={() => {
            setShowModal(false);
          }}
          {...selectedCalendar}
        />
      ) : (
        <></>
      )}
    </>
  );
}
