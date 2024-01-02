import MainUtils from "@/components/MainUtils";
import styles from "@/styles/app-page.module.scss";
import { getDates } from "@/utils/date";

export default function Home() {
  const today = new Date();
  const [year, month] = [today.getFullYear(), today.getMonth() + 1];

  const dates = getDates(year, month);

  return (
    <main className={styles.main}>
      <MainUtils />
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
              className={[
                i % 7 === 0 || i % 7 === 6 ? styles["weekend"] : "",
                v.getMonth() !== today.getMonth() ? styles["other-month"] : "",
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
    </main>
  );
}
