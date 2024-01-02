import styles from "@/styles/main-header.module.scss";

const MainHeader = ({ year, month }: { year: number; month: number }) => {
  return (
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
  );
};

export default MainHeader;
