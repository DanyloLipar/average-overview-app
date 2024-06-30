import { initializeChart } from "./chart";
import { batches } from "../constants/batches";
import { updateAvarageStatus } from "./status";

document.addEventListener("DOMContentLoaded", () => {
  const tableBatches = batches;
  const applyBtn = document.getElementById("applyBtn");
  const clearBtn = document.getElementById("clearBtn");
  const timeFilter = document.getElementById("timeFilter");
  const batchTableBody = document.querySelector(".batches__body");
  const totalRecordsCount = document.querySelector(".total--count");

  const renderBatches = (filteredBatches) => {
    batchTableBody.innerHTML = "";
    filteredBatches.forEach((batch) => {
      const row = document.createElement("tr");
      row.classList.add("batches__row");
      row.innerHTML = `
        <td class="batches__data">${batch.name}</td>
        <td class="batches__data">${batch.id}</td>
        <td class="batches__data">
          <span class="batches__data--status status-${batch.status}">
            ${batch.status}
          </span>
        </td>
        <td class="batches__data">${batch.processed}</td>
        <td class="batches__data">${batch.total}</td>
      `;
      batchTableBody.appendChild(row);
    });
  };

  const changeStatusTime = () => {
    const timeStatusField = document.getElementById("statusTime");
    let newStatusTime;

    if (timeFilter.value === "today") {
      newStatusTime = "today";
    } else if (timeFilter.value === "3days") {
      newStatusTime = "in last 3 days";
    } else if (timeFilter.value === "7days") {
      newStatusTime = "in last 7 days";
    } else {
      newStatusTime = "last month";
    }

    timeStatusField.innerHTML = newStatusTime;
  };

  const calculateTotalRecords = (filteredBatches) => {
    const totalRecords = filteredBatches.reduce(
      (sum, batch) => sum + batch.total,
      0
    );
    totalRecordsCount.textContent = totalRecords;
  };

  const filterAndRenderBatches = () => {
    let filteredBatches =
      timeFilter.value === "month"
        ? tableBatches
        : batches.filter((batch) => batch.date === timeFilter.value);

    renderBatches(filteredBatches);
    changeStatusTime();
    updateAvarageStatus();
    calculateTotalRecords(filteredBatches);
  };

  applyBtn.addEventListener("click", () => {
    filterAndRenderBatches();
  });

  clearBtn.addEventListener("click", () => {
    timeFilter.value = "month";
    filterAndRenderBatches();
  });

  initializeChart();
  filterAndRenderBatches();
});
