import styles from "@/styles/main-utils.module.scss";

const MainUtils = () => {
  return (
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
  );
};

export default MainUtils;
