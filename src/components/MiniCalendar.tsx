"use client";

import { useMiniCalendarDateState } from "@/hooks/useGlobalState";
import styles from "@/styles/mini-calendar.module.scss";
import { getDates } from "@/utils/date";

export default function MiniCalendar() {
  const [date, setDate] = useMiniCalendarDateState();
  const [year, month] = [date.getFullYear(), date.getMonth() + 1];

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dates = getDates(year, month);

  const changeMonth = (value: number) => {
    const alt = new Date(date);
    alt.setMonth(alt.getMonth() + value, 1);
    setDate(alt);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span
          className="material-symbols-outlined"
          onClick={() => changeMonth(-1)}
        >
          arrow_back_ios
        </span>
        <span className={styles.date}>{`${year}년 ${month}월`}</span>
        <span
          className="material-symbols-outlined"
          onClick={() => changeMonth(1)}
        >
          arrow_forward_ios
        </span>
      </div>
      <div className={styles.main}>
        {week.map((v, i) => (
          <span key={i}>{v}</span>
        ))}
        {dates.map((v, i) =>
          v.getFullYear() === date.getFullYear() &&
          v.getMonth() === date.getMonth() &&
          v.getDate() === date.getDate() ? (
            <span className={styles.today} key={i}>
              {v?.getDate()}
            </span>
          ) : (
            <span
              className={[
                i % 7 === 0 || i % 7 === 6 ? "" : `${styles.week}`,
                v.getMonth() != date.getMonth()
                  ? `${styles["other-month"]}`
                  : "",
              ].join(" ")}
              key={i}
            >
              {v?.getDate()}
            </span>
          )
        )}
      </div>
    </div>
  );
}
