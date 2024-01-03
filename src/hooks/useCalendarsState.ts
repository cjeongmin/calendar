import { Calendar, calendarsState } from "@/atoms/calendars";
import { useCallback, useMemo } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";

const useCalendarsState = () => {
  return useRecoilState(calendarsState);
};

export default useCalendarsState;
