import nodeCron from "node-cron";
import { completeExpiredHacks } from "../db/queries/hacks.js";

export const startHackCompletionJob = () => {
  nodeCron.schedule("*/30 * * * * *", async () => {
    try {
      const completed = await completeExpiredHacks();

      if (completed.length > 0) {
        console.log(
          `[HackCompletionJob] Completed ${completed.length} hack(s)`
        );
      }
    } catch (error) {
      console.error("Error processing hack completions:", error);
    }
  });

  console.log(
    "🕐 Hack completion job started - checking hacks every 30 seconds."
  );
};
