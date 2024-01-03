import { DefaultValue, atom, selector } from "recoil";

export type CalendarType = "day" | "week" | "month" | "year";
export const globalState = atom<{
  mainCalendarDate: Date;
  miniCalendarDate: Date;
  calendarType: CalendarType;
}>({
  key: "global",
  default: {
    mainCalendarDate: new Date(),
    miniCalendarDate: new Date(),
    calendarType: "month",
  },
});

export const mainCalendarDateState = selector<Date>({
  key: "mainCalendarDate",
  get: ({ get }) => {
    const global = get(globalState);
    return global.mainCalendarDate;
  },
  set: ({ get, set, reset }, mainCalendarDate) => {
    const global = get(globalState);
    if (mainCalendarDate instanceof Date) {
      set(globalState, { ...global, mainCalendarDate });
    } else if (mainCalendarDate instanceof DefaultValue) {
      reset(globalState);
    }
  },
});

export const miniCalendarDateState = selector<Date>({
  key: "miniCalendarDate",
  get: ({ get }) => {
    const global = get(globalState);
    return global.miniCalendarDate;
  },
  set: ({ get, set, reset }, miniCalendarDate) => {
    const global = get(globalState);
    if (miniCalendarDate instanceof Date) {
      set(globalState, { ...global, miniCalendarDate });
    } else if (miniCalendarDate instanceof DefaultValue) {
      reset(globalState);
    }
  },
});

export const calendarTypeState = selector<CalendarType>({
  key: "calendarType",
  get: ({ get }) => {
    const global = get(globalState);
    return global.calendarType;
  },
  set: ({ get, set, reset }, calendarType) => {
    const global = get(globalState);
    if (calendarType instanceof DefaultValue) {
      reset(globalState);
    } else {
      set(globalState, { ...global, calendarType });
    }
  },
});
