import { atom } from "recoil";

export type Calendar = {
  name: string;
  color: string;
  checked: boolean;
};

export const calendarsState = atom<Calendar[]>({
  key: "calendars",
  default: [],
});
