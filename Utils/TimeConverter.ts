export function TimeConverter({
  fromDate,
  toDate,
}: {
  fromDate: Date;
  toDate: Date;
}) {
  fromDate = new Date(
    Date.UTC(
      fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDate(),
      0,
      0,
      0,
      0,
    ),
  );
  toDate = new Date(
    Date.UTC(
      toDate.getFullYear(),
      toDate.getMonth(),
      toDate.getDate(),
      23,
      59,
      59,
      0,
    ),
  );

  return { fromDate, toDate };
}
