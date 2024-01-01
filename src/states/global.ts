import { DefaultValue, atom, selector } from "recoil";

const globalState = atom<{
  mainCalendarDate: Date;
  miniCalendarDate: Date;
}>({
  key: "global",
  default: {
    mainCalendarDate: new Date(),
    miniCalendarDate: new Date(),
  },
});

export const mainCalendarDate = selector<Date>({
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

export const miniCalendarDate = selector<Date>({
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
