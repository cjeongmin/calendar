export function getDates(year: number, month: number): Date[] {
  const ret: Date[] = [];

  const _month = month - 1;

  const firstDayOfMonth = new Date(year, _month, 1);
  const lastDayOfMonth = new Date(year, _month, 0);

  let i = firstDayOfMonth.getDay();
  for (let j = 0; j < i; j++) {
    ret.push(new Date(year, _month, j - i + 1));
  }

  let date = 1;
  while (date <= lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + 1) {
    ret.push(new Date(year, _month, date));
    date++;
  }

  let remains = 7 - (ret.length % 7);
  for (let j = 0, date = 1; j < remains; j++) {
    ret.push(new Date(year, _month + 1, date));
    date++;
  }

  return ret;
}
