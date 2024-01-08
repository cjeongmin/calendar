import { Calendar, calendarsState } from "@/atoms/calendars";
import { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";

type CalendarOption = { [key in keyof Calendar]?: Calendar[key] };

const useCalendarsStateActions = () => {
  const [calendars, setCalendars] = useRecoilState(calendarsState);

  const add = useCallback(
    ({ id, name, color, checked }: Calendar) => {
      setCalendars((prev) =>
        prev.concat({
          id,
          name,
          color,
          checked,
        })
      );

      localStorage.setItem(
        "calendars",
        JSON.stringify(
          calendars.concat({
            id,
            name,
            color,
            checked,
          })
        )
      );
    },
    [calendars, setCalendars]
  );

  const find = useCallback(
    (id: string) => {
      return calendars.find((calendar) => calendar.id === id);
    },
    [calendars]
  );

  const toggle = useCallback(
    (id: string) => {
      const calendar = find(id);
      if (calendar === undefined) {
        return;
      }

      setCalendars((prev) =>
        prev.map((v) => (v.id === id ? { ...v, checked: !v.checked } : v))
      );

      localStorage.setItem(
        "calendars",
        JSON.stringify(
          calendars.map((v) =>
            v.id === id ? { ...v, checked: !v.checked } : v
          )
        )
      );
    },
    [calendars, setCalendars, find]
  );

  const remove = useCallback(
    (id: string) => {
      setCalendars((prev) => prev.filter((v) => v.id !== id));
      localStorage.setItem(
        "calendars",
        JSON.stringify(calendars.filter((v) => v.id !== id))
      );
    },
    [calendars, setCalendars]
  );

  const update = useCallback(
    (calendarId: Calendar["id"], updateOption: CalendarOption) => {
      if (find(calendarId) === undefined) {
        return;
      }

      setCalendars((prev) =>
        prev.map((v) =>
          v.id !== calendarId
            ? v
            : {
                ...v,
                ...updateOption,
              }
        )
      );

      localStorage.setItem(
        "calendars",
        JSON.stringify(
          calendars.map((v) =>
            v.id !== calendarId ? v : { ...v, ...updateOption }
          )
        )
      );
    },
    [calendars, setCalendars, find]
  );

  return useMemo(
    () => ({ add, find, toggle, remove, update }),
    [add, find, toggle, remove, update]
  );
};

export default useCalendarsStateActions;
