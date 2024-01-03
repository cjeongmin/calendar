import { calendarsState } from "@/atoms/calendars";
import { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";

const useCalendarsStateActions = () => {
  const [calendars, setCalendars] = useRecoilState(calendarsState);

  const add = useCallback(
    (name: string, color: string) => {
      if (calendars.find((calendar) => calendar.name === name)) {
        return;
      }

      setCalendars((prev) =>
        prev.concat({
          name,
          color,
          checked: true,
        })
      );

      localStorage.setItem(
        "calendars",
        JSON.stringify(
          calendars.concat({
            name,
            color,
            checked: true,
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
        prev
          .filter((item) => item.name !== name)
          .concat({
            ...calendar,
            checked: !calendar?.checked,
          })
      );

      localStorage.setItem(
        "calendars",
        JSON.stringify(
          calendars
            .filter((item) => item.name !== name)
            .concat({
              ...calendar,
              checked: !calendar?.checked,
            })
        )
      );
    },
    [calendars, setCalendars, find]
  );

  return useMemo(() => ({ add, find, toggle }), [add, find, toggle]);
};

export default useCalendarsStateActions;
