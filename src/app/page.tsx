import styles from "@/styles/app-page.module.scss";

export default function Home() {
  const today = new Date();
  const [year, month] = [today.getFullYear(), today.getMonth() + 1];

  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  let date = firstDayOfMonth.getDay();
  const dates: Array<Date | null> = [];
  let currentDate = 1;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth.getDay()) {
        dates.push(null);
      } else if (currentDate > lastDayOfMonth.getDate()) {
        dates.push(null);
      } else {
        dates.push(new Date(year, month - 1, currentDate));
        currentDate += 1;
      }
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.utils}>
        <button className={styles["add-button"]}>+</button>
        <div className={styles.types}>
          <span>일</span>
          <span>주</span>
          <span>월</span>
          <span>년</span>
        </div>
        <input placeholder={"검색"} className={styles.search} />
      </div>
      <header className={styles.header}>
        <h1>{`${year}년 ${month}월`}</h1>
        <div className={styles.buttons}>
          <button>
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <button>
            <div>오늘</div>
          </button>
          <button>
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
        </div>
      </header>
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
              className={i % 7 === 0 || i % 7 === 6 ? styles["weekend"] : ""}
              key={i}
            >
              {v?.getDate()}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
