import { updateChart } from "./chart";
import {
  calculateStatusPercentage,
  calculateStatusRecords,
} from "./helpers/helpers";
import { notifications } from "../constants/notifications";

export const updateAvarageStatus = () => {
  const arrowBox = document.querySelectorAll(".arrow-box");
  const timeFilterValue = document.getElementById("timeFilter").value;

  const filteredNotifications = notifications.filter(
    (notification) => notification.date === timeFilterValue
  );

  const emailsAmount = document.getElementById("emails");
  const smsAmount = document.getElementById("sms");
  const printAmount = document.getElementById("print");

  emailsAmount.innerHTML = filteredNotifications[0].emails;
  smsAmount.innerHTML = filteredNotifications[0].sms;
  printAmount.innerHTML = filteredNotifications[0].print;

  const runningCount = document.getElementById("runningCount");
  const scheduledCount = document.getElementById("scheduledCount");
  const successCount = document.getElementById("successCount");
  const errorCount = document.getElementById("errorCount");

  const runningPercentage = document.getElementById("runningPercentage");
  const scheduledPercentage = document.getElementById("scheduledPercentage");
  const successPercentage = document.getElementById("successPercentage");
  const errorPercentage = document.getElementById("errorPercentage");

  runningPercentage.innerHTML = calculateStatusPercentage("processing");
  scheduledPercentage.innerHTML = calculateStatusPercentage("open");
  successPercentage.innerHTML = calculateStatusPercentage("finished");
  errorPercentage.innerHTML = calculateStatusPercentage("failed");

  const running = calculateStatusRecords("processing");
  const scheduled = calculateStatusRecords("open");
  const success = calculateStatusRecords("finished");
  const failed = calculateStatusRecords("failed");

  runningCount.innerHTML = running;
  scheduledCount.innerHTML = scheduled;
  successCount.innerHTML = success;
  errorCount.innerHTML = failed;

  updateChart([running, success, scheduled, failed]);
};
