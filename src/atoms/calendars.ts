import { atom } from "recoil";

export type Calendar = {
  [key: string]: any;
  id: string;
  name: string;
  color: string;
  checked: boolean;
};

export const calendarsState = atom<Calendar[]>({
  key: "calendars",
  default: [],
});
