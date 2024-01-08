import { useCallback, useMemo } from "react";
import useSchedulesState from "./useSchedulesState";
import { Schedule } from "@/atoms/schedules";

type ScheduleOption = { [key in keyof Schedule]?: Schedule[key] };

const useSchedulesStateActions = () => {
  const [schedules, setSchedules] = useSchedulesState();

  const add = useCallback(
    (schedule: Schedule) => {
      setSchedules((prev) => prev.concat(schedule));
      localStorage.setItem(
        "schedules",
        JSON.stringify(schedules.concat(schedule))
      );
    },
    [schedules, setSchedules]
  );

  const update = useCallback(
    (scheduleId: Schedule["id"], option: ScheduleOption) => {
      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === scheduleId ? { ...schedule, ...option } : schedule
        )
      );
      localStorage.setItem(
        "schedules",
        JSON.stringify(
          schedules.map((schedule) =>
            schedule.id === scheduleId ? { ...schedule, ...option } : schedule
          )
        )
      );
    },
    [schedules, setSchedules]
  );

  const remove = useCallback(
    (scheduleId: Schedule["id"]) => {
      setSchedules((prev) =>
        prev.filter((schedule) => schedule.id !== scheduleId)
      );
      localStorage.setItem(
        "schedules",
        JSON.stringify(
          schedules.filter((schedule) => schedule.id !== scheduleId)
        )
      );
    },
    [schedules, setSchedules]
  );

  return useMemo(
    () => ({
      add,
      update,
      remove,
    }),
    [add, update, remove]
  );
};

export default useSchedulesStateActions;
