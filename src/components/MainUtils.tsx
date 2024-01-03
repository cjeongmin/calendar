"use client";

import { useCalendarTypeState } from "@/hooks/useGlobalState";
import styles from "@/styles/main-utils.module.scss";

const MainUtils = () => {
  const [calendarType, setCalendarType] = useCalendarTypeState();

  return (
    <div className={styles.utils}>
      <button className={styles["add-button"]}>+</button>
      <div className={styles.types}>
        <span
          onClick={() => setCalendarType("day")}
          className={calendarType === "day" ? styles["selected"] : undefined}
        >
          일
        </span>
        <span
          onClick={() => setCalendarType("week")}
          className={calendarType === "week" ? styles["selected"] : undefined}
        >
          주
        </span>
        <span
          onClick={() => setCalendarType("month")}
          className={calendarType === "month" ? styles["selected"] : undefined}
        >
          월
        </span>
        <span
          onClick={() => setCalendarType("year")}
          className={calendarType === "year" ? styles["selected"] : undefined}
        >
          년
        </span>
      </div>
      <input placeholder={"검색"} className={styles.search} />
    </div>
  );
};

export default MainUtils;
