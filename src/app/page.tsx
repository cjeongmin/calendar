"use client";

import MainHeader from "@/components/MainHeader";
import MainUtils from "@/components/MainUtils";
import MonthCalendar from "@/components/MonthCalendar";
import { useCalendarTypeState } from "@/hooks/useGlobalState";
import styles from "@/styles/app-page.module.scss";

export default function Home() {
  const [calendarType, _] = useCalendarTypeState();

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
