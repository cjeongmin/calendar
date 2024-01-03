"use client";

import { useMainCalendarDateState } from "@/hooks/useGlobalState";
import styles from "@/styles/month-calendar.module.scss";
import { getDates } from "@/utils/date";

const MonthCalendar = () => {
  const today = new Date();
  const [calendarDate, _] = useMainCalendarDateState();
  const dates = getDates(
    calendarDate.getFullYear(),
    calendarDate.getMonth() + 1
  );

  return (
    <div className={styles["main-calendar"]}>
      <div className={styles.week}>
        <span className={styles.weekend}>일</span>
        <span>월</span>
        <span>화</span>
        <span>수</span>
        <span>목</span>
        <span>금</span>
        <span className={styles.weekend}>토</span>
      </div>
      <div className={styles.dates}>
        {dates.map((v, i) => (
          <span
            className={[
              i % 7 === 0 || i % 7 === 6 ? styles["weekend"] : "",
              v.getMonth() !== calendarDate.getMonth()
                ? styles["other-month"]
                : "",
              v.getFullYear() === today.getFullYear() &&
              v.getMonth() === today.getMonth() &&
              v.getDate() === today.getDate()
                ? styles["today"]
                : "",
            ].join(" ")}
            style={
              i % 7 === 0 || i % 7 === 6
                ? {
                    backgroundColor: "#272727",
                  }
                : {}
            }
            key={i}
          >
            {v.getDate() === 1
              ? `${v.getMonth() + 1}월 ${v.getDate()}일`
              : `${v.getDate()}일`}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MonthCalendar;
