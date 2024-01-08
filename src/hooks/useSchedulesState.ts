import { getSchedules, schedulesState } from "@/atoms/schedules";
import { useRecoilState, useRecoilValue } from "recoil";

const useSchedulesState = () => {
  return useRecoilState(schedulesState);
};
export default useSchedulesState;

export const useFilteredSchedules = ({
  calendarName,
}: {
  calendarName?: string;
}) => {
  return useRecoilValue(getSchedules({ calendarName }));
};
