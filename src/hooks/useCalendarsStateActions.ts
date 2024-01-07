import { Calendar, calendarsState } from "@/atoms/calendars";
import { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";

type CalendarOption = { [key in keyof Calendar]?: Calendar[key] };

const useCalendarsStateActions = () => {
  const [calendars, setCalendars] = useRecoilState(calendarsState);

  const add = useCallback(
    ({ name, color, checked }: Calendar) => {
      if (calendars.find((calendar) => calendar.name === name)) {
        return;
      }

      setCalendars((prev) =>
        prev.concat({
          name,
          color,
          checked,
        })
      );

      localStorage.setItem(
        "calendars",
        JSON.stringify(
          calendars.concat({
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
    (name: string) => {
      return calendars.find((calendar) => calendar.name === name);
    },
    [calendars]
  );

  const toggle = useCallback(
    (name: string) => {
      const calendar = find(name);
      if (!calendar) {
        return;
      }

      setCalendars((prev) =>
        prev.map((v) => (v.name === name ? { ...v, checked: !v.checked } : v))
      );

      localStorage.setItem(
        "calendars",
        JSON.stringify(
          calendars.map((v) =>
            v.name === name ? { ...v, checked: !v.checked } : v
          )
        )
      );
    },
    [calendars, setCalendars, find]
  );

  const remove = useCallback(
    (name: string) => {
      setCalendars((prev) => prev.filter((v) => v.name !== name));
      localStorage.setItem(
        "calendars",
        JSON.stringify(calendars.filter((v) => v.name !== name))
      );
    },
    [calendars, setCalendars]
  );

  const update = useCallback(
    (calendar: Calendar, updateOption: CalendarOption) => {
      if (
        updateOption.name &&
        calendar.name !== updateOption.name &&
        find(updateOption.name) !== undefined
      ) {
        return;
      }

      setCalendars((prev) =>
        prev.map((v) =>
          v.name !== calendar.name
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
            v.name !== calendar.name ? v : { ...v, ...updateOption }
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
