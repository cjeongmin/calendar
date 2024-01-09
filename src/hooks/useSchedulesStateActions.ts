import { useCallback, useMemo } from "react";
import useSchedulesState from "./useSchedulesState";
import { Schedule } from "@/atoms/schedules";
import { secureHeapUsed } from "crypto";
import { isEqual } from "@/utils/date";

type ScheduleOption = {
  readonly [key in keyof Schedule]?: Schedule[key];
};

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

  const find = useCallback(
    (option?: ScheduleOption) => {
      if (option === undefined) {
        return schedules;
      }

      let ret = [...schedules];
      for (const key in option) {
        if (key === "date") {
          const optionDate = option.date;
          if (optionDate === undefined) continue;
          ret = ret.filter((schedule) => isEqual(schedule.date, optionDate));
        } else {
          ret = ret.filter((schedule) => schedule[key] === option[key]);
        }
      }
      return ret;
    },
    [schedules]
  );

  return useMemo(
    () => ({
      add,
      update,
      remove,
      find,
    }),
    [add, update, remove, find]
  );
};

export default useSchedulesStateActions;
