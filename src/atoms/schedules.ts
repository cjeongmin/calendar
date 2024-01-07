import { atom, selectorFamily } from "recoil";
import { Calendar } from "./calendars";

export type Schedule = {
  calendar?: Calendar;
  content: string;
  date: Date;
  memo: string;
  withoutTime: boolean;
};

export const schedulesState = atom<Schedule[]>({
  key: "schedules",
  default: [],
});

export const getSchedules = selectorFamily<
  Schedule[],
  { calendarName?: string }
>({
  key: "getSchedules",
  get:
    ({ calendarName }) =>
    ({ get }) => {
      const schedules = get(schedulesState);
      return schedules.filter(
        (schedule) => schedule.calendar?.name === calendarName
      );
    },
});
