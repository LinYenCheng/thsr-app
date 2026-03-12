function minutesOfDay(d: Date) {
  return d.getMinutes() + d.getHours() * 60;
}

function getTravelTime({ date, start, end }: { date: string; start: string; end: string }) {
  const diffMillis = new Date(`${date} ${end}`).getTime() - new Date(`${date} ${start}`).getTime();

  const hours = Math.floor(diffMillis / (1000 * 60 * 60));
  const minutes = Math.floor((diffMillis % (1000 * 60 * 60)) / (1000 * 60));

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

function sortByField({
  data,
  field,
  direction,
  enableSort,
}: {
  data: any[];
  field: string;
  direction: number;
  enableSort: boolean;
}) {
  if (!enableSort) return data;

  return data.sort((a, b) => {
    const valueA = new Date(`${a?.trainDate} ${a[field]}`);
    const valueB = new Date(`${b?.trainDate} ${b[field]}`);
    return direction * (minutesOfDay(valueA) - minutesOfDay(valueB));
  });
}

export { getTravelTime, sortByField };
