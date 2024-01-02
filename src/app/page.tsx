import MainHeader from "@/components/MainHeader";
import MainUtils from "@/components/MainUtils";
import MonthCalendar from "@/components/MonthCalendar";
import styles from "@/styles/app-page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <MainUtils />
      <MainHeader />
      <MonthCalendar />
    </main>
  );
}
