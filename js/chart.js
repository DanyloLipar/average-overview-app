let myDonutChart = null;

export const initializeChart = () => {
  const ctx = document.getElementById("DonutChart").getContext("2d");

  const data = {
    datasets: [
      {
        data: [350, 150, 40, 40],
        backgroundColor: ["#03a9f4", "#22c55e", "#ff7b1c", "#d32f2f"],
        hoverOffset: 2,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "48%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  myDonutChart = new Chart(ctx, {
    type: "doughnut",
    data: data,
    options: options,
  });
};

export const updateChart = (newData) => {
  if (myDonutChart) {
    myDonutChart.data.datasets[0].data = newData;
    myDonutChart.update();
  }
};
