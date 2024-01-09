"use client";

import { Schedule } from "@/atoms/schedules";
import { useMainCalendarDateState } from "@/hooks/useGlobalState";
import useSchedulesStateActions from "@/hooks/useSchedulesStateActions";
import styles from "@/styles/month-calendar.module.scss";
import { getDates, isSameDate } from "@/utils/date";
import { MouseEventHandler, useCallback, useEffect, useState } from "react";

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
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const { add, find } = useSchedulesStateActions();

  const createSchedule: MouseEventHandler<HTMLDivElement> = useCallback(() => {
    add({
      id: crypto.randomUUID(),
      content: "새로운 일정",
      date: date,
      memo: "",
      withoutTime: false,
    });
  }, [add, date]);

  useEffect(() => {
    setSchedules(find({ date: date }));
  }, [find, date]);

  return (
    <div
      className={[styles["date-item"], isWeekend ? styles["weekend"] : ""].join(
        " "
      )}
      style={
        isWeekend
          ? {
              backgroundColor: "#272727",
            }
          : {}
      }
      onDoubleClick={createSchedule}
    >
      <span
        className={[
          isOtherMonth ? styles["other-month"] : "",
          isToday ? styles["today"] : "",
        ].join(" ")}
      >
        {date.getDate() === 1
          ? `${date.getMonth() + 1}월 ${date.getDate()}일`
          : `${date.getDate()}일`}
      </span>
      {schedules.map((schedule, i) => (
        <div key={i} className={styles["schedule-item"]}>
          <div className={styles["color-content"]}>
            <div className={styles["color"]} />
            {schedule.content}
          </div>
          <span className={styles["time"]}>
            {`${schedule.date
              .getHours()
              .toString()
              .padStart(2, "0")}:${schedule.date
              .getMinutes()
              .toString()
              .padStart(2, "0")}`}
          </span>
        </div>
      ))}
    </div>
  );
};

const MonthCalendar = () => {
  const today = new Date();
  const [calendarDate, setCalendarDate] = useMainCalendarDateState();
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
