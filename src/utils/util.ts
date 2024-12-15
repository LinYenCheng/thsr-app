import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// Use the plugin
dayjs.extend(utc);

function minutesOfDay(m) {
  return m.minute() + m.hour() * 60; // Use `minute()` and `hour()` instead of `minutes()` and `hours()`
}

function getTravelTime({ date, start, end }: { date: string; start: string; end: string }) {
  const result = dayjs
    .utc(
      dayjs(`${date} ${end}`, 'YYYY-MM-DD HH:mm').diff(
        dayjs(`${date} ${start}`, 'YYYY-MM-DD HH:mm:ss')
      )
    )
    .format('HH:mm');
  return result;
}

function sortByField({
  data,
  field,
  direction,
  enableSort
}: {
  data: any[];
  field: string;
  direction: number;
  enableSort: boolean;
}) {
  if (!enableSort) return data;

  return data.sort((a, b) => {
    const valueA = dayjs(`${a?.trainDate} ${a[`${field}`]}`);
    const valueB = dayjs(`${b?.trainDate} ${b[`${field}`]}`);
    return direction * (minutesOfDay(valueA) - minutesOfDay(valueB));
  });
}

export { getTravelTime, sortByField };
