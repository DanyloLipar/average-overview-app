import { batches } from "../../constants/batches";

export const calculateStatusRecords = (value) => {
  const timeFilterValue = document.getElementById("timeFilter").value;

  const filteredBatches =
    timeFilterValue === "month"
      ? batches
      : batches.filter((batch) => batch.date === timeFilterValue);

  const avarageCount = filteredBatches
    .filter((batch) => batch.status === value)
    .reduce((sum, batch) => sum + batch.total, 0);

  const total = typeof avarageCount !== "number" ? 0 : avarageCount;

  return total;
};

export const calculateStatusPercentage = (value) => {
  const timeFilterValue = document.getElementById("timeFilter").value;

  const filteredBatches =
    timeFilterValue === "month"
      ? batches
      : batches.filter((batch) => batch.date === timeFilterValue);

  const totalRecords = filteredBatches.reduce(
    (sum, batch) => sum + batch.total,
    0
  );

  const avaragePart = filteredBatches
    .filter((batch) => batch.status === value)
    .reduce((sum, batch) => sum + batch.total, 0);

  const part = typeof avaragePart !== "number" ? 0 : avaragePart;

  return `(${((part / totalRecords) * 100).toFixed(0)}%)`;
};
