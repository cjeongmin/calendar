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
  set: ({ get, set, reset }, newValue) => {
    const global = get(globalState);
    if (newValue instanceof Date) {
      set(globalState, { ...global, mainCalendarDate: newValue });
    } else if (newValue instanceof DefaultValue) {
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
  set: ({ get, set, reset }, newValue) => {
    const global = get(globalState);
    if (newValue instanceof Date) {
      set(globalState, { ...global, miniCalendarDate: newValue });
    } else if (newValue instanceof DefaultValue) {
      reset(globalState);
    }
  },
});
