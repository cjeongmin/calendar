"use client";

import { mainCalendarDate } from "@/states/global";
import styles from "@/styles/main-header.module.scss";
import { useRecoilState } from "recoil";

const MainHeader = () => {
  const [calendarDate, setDate] = useRecoilState(mainCalendarDate);
  const [year, month] = [
    calendarDate.getFullYear(),
    calendarDate.getMonth() + 1,
  ];

  const changeMonth = (value: number) => {
    const alt = new Date(calendarDate);
    alt.setMonth(alt.getMonth() + value, 1);
    setDate(alt);
  };

  return (
    <header className={styles.header}>
      <h1>{`${year}년 ${month}월`}</h1>
      <div className={styles.buttons}>
        <button onClick={() => changeMonth(-1)}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <button onClick={() => setDate(new Date())}>
          <div>오늘</div>
        </button>
        <button onClick={() => changeMonth(1)}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </header>
  );
};

export default MainHeader;
