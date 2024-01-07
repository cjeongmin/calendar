"use client";

import { getSchedules } from "@/atoms/schedules";
import { useMainCalendarDateState } from "@/hooks/useGlobalState";
import styles from "@/styles/month-calendar.module.scss";
import { getDates, isSameDate } from "@/utils/date";

const DateItem = ({
  date,
  isOtherMonth,
  isToday,
  isWeekend,
}: {
  date: Date;
  isOtherMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
}) => {
  return (
    <span
      className={[
        isWeekend ? styles["weekend"] : "",
        isOtherMonth ? styles["other-month"] : "",
        isToday ? styles["today"] : "",
      ].join(" ")}
      style={
        isWeekend
          ? {
              backgroundColor: "#272727",
            }
          : {}
      }
    >
      {date.getDate() === 1
        ? `${date.getMonth() + 1}월 ${date.getDate()}일`
        : `${date.getDate()}일`}
    </span>
  );
};

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
          <DateItem
            key={i}
            date={v}
            isOtherMonth={calendarDate.getMonth() !== v.getMonth()}
            isToday={isSameDate(v, today)}
            isWeekend={i % 7 === 0 || i % 7 === 6 ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default MonthCalendar;
