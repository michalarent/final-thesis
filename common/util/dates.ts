import { DateTime } from "luxon";

export const getStandardDate = (date) => {
  if (typeof date === "string") {
    return DateTime.fromMillis(new Date(date).getTime()).toLocaleString(
      DateTime.DATE_HUGE
    );
  }
  return DateTime.fromMillis(date).toLocaleString(DateTime.DATE_HUGE);
};

export const getShortDate = (date) => {
  if (typeof date === "string") {
    return DateTime.fromMillis(new Date(date).getTime()).toLocaleString(
      DateTime.DATE_SHORT
    );
  }
  return DateTime.fromMillis(date).toLocaleString(DateTime.DATE_SHORT);
};

export const getAge = (date) => {
  const then = DateTime.fromMillis(new Date(date).getTime());
  const now = DateTime.local();
  const diff = now.diff(then, "years");
  return diff.years;
};

export const eqCalendarDate = (date1_millis: number, date2_millis: number) => {
  return (
    DateTime.fromMillis(date1_millis)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toISO() ===
    DateTime.fromMillis(date2_millis)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toISO()
  );
};
