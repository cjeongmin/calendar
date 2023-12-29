import styles from "@/styles/mini-calendar.module.scss";

export default function MiniCalendar() {
  const today = new Date();
  const [year, month] = [today.getFullYear(), today.getMonth() + 1];

  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  const rows = Math.ceil(
    (lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + 1) / 7
  );

  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const datesArray = [];
  let currentDate = 1;
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth.getDay()) {
        datesArray.push(null);
      } else if (currentDate > lastDayOfMonth.getDate()) {
        datesArray.push(null);
      } else {
        datesArray.push(new Date(year, month - 1, currentDate));
        currentDate += 1;
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className="material-symbols-outlined">arrow_back_ios</span>
        <span className={styles.date}>{`${year}년 ${month}월`}</span>
        <span className="material-symbols-outlined">arrow_forward_ios</span>
      </div>
      <div className={styles.main}>
        {week.map((v, i) => (
          <span key={i}>{v}</span>
        ))}
        {datesArray.map((v, i) =>
          v?.getFullYear() === today.getFullYear() &&
          v.getMonth() === today.getMonth() &&
          v.getDate() === today.getDate() ? (
            <span className={styles.today} key={i}>
              {v?.getDate()}
            </span>
          ) : (
            <span
              className={i % 7 === 0 || i % 7 === 6 ? "" : `${styles.week}`}
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
