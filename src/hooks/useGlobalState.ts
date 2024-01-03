import {
  calendarTypeState,
  globalState,
  mainCalendarDateState,
  miniCalendarDateState,
} from "@/atoms/global";
import { useRecoilState } from "recoil";

const useGlobalState = () => {
  return useRecoilState(globalState);
};
export default useGlobalState;

export const useMainCalendarDateState = () => {
  return useRecoilState(mainCalendarDateState);
};

export const useMiniCalendarDateState = () => {
  return useRecoilState(miniCalendarDateState);
};

export const useCalendarTypeState = () => {
  return useRecoilState(calendarTypeState);
};
