import moment from 'moment';

function minutesOfDay(m) {
  return m.minutes() + m.hours() * 60;
}

function getTravelTime({ date, start, end }: { date: string; start: string; end: string }) {
  const result = moment
    .utc(
      moment(`${date} ${end}`, 'YYYY-MM-DD HH:mm').diff(
        moment(`${date} ${start}`, 'YYYY-MM-DD HH:mm:ss')
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
    const valueA = moment(`${a?.trainDate} ${a[`${field}`]}`);
    const valueB = moment(`${b?.trainDate} ${b[`${field}`]}`);
    return direction * (minutesOfDay(valueA) - minutesOfDay(valueB));
  });
}

export { getTravelTime, sortByField };
