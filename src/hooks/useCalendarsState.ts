import { calendarsState } from "@/atoms/calendars";
import { useRecoilState } from "recoil";

const useCalendarsState = () => {
  return useRecoilState(calendarsState);
};

export default useCalendarsState;
