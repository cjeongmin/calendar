"use client";

import { Calendar } from "@/atoms/calendars";
import { Schedule } from "@/atoms/schedules";
import MainHeader from "@/components/MainHeader";
import MainUtils from "@/components/MainUtils";
import MonthCalendar from "@/components/MonthCalendar";
import { CalendarDefaultColor } from "@/components/Navbar";
import useCalendarsState from "@/hooks/useCalendarsState";
import useCalendarsStateActions from "@/hooks/useCalendarsStateActions";
import { useCalendarTypeState } from "@/hooks/useGlobalState";
import useSchedulesState from "@/hooks/useSchedulesState";
import styles from "@/styles/app-page.module.scss";
import { useEffect } from "react";

export default function Home() {
  const [calendars, setCalendars] = useCalendarsState();
  const [calendarType, setCalendarType] = useCalendarTypeState();
  const [schedules, setSchedules] = useSchedulesState();

  const { add: addCalendar } = useCalendarsStateActions();

  useEffect(() => {
    const calendarsData = localStorage.getItem("calendars");
    if (calendarsData) {
      const alt: Calendar[] = JSON.parse(calendarsData);
      setCalendars(alt);
    } else {
      // 없으면 기본 캘린더 추가
      addCalendar({
        id: crypto.randomUUID(),
        name: "캘린더",
        color: CalendarDefaultColor,
        checked: true,
      });
    }

    const schedulesData = localStorage.getItem("schedules");
    if (schedulesData) {
      const alt: Schedule[] = JSON.parse(schedulesData);
      setSchedules(alt);
    } else {
      localStorage.setItem("schedules", JSON.stringify([]));
    }
  }, []);

  let calendar: JSX.Element | null = null;
  if (calendarType === "day") {
  } else if (calendarType === "week") {
  } else if (calendarType === "month") {
    calendar = <MonthCalendar />;
  } else if (calendarType === "year") {
  }

  return (
    <main className={styles.main}>
      <MainUtils />
      <MainHeader />
      {calendar}
    </main>
  );
}
