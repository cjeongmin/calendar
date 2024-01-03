import { atom } from "recoil";

export type Calendar = {
  name: string;
  color: string;
  checked: boolean;
};

const getCalendarsFromLocalStorage = () => {
  let ret: Calendar[] = [];

  const data = localStorage.getItem("calendar");
  if (data) {
    ret = JSON.parse(data);
  } else {
    ret = [
      {
        name: "캘린더",
        color: "#60C69A",
        checked: true,
      },
    ];
  }

  return ret;
};

export const calendarsState = atom<Calendar[]>({
  key: "calendars",
  default: getCalendarsFromLocalStorage(),
});
