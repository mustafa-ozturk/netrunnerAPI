import nodeCron from "node-cron";
import { completeExpiredHacks } from "../db/queries/hacks.js";
import { deleteScannedNodeByName } from "../db/queries/scannedNodes.js";

export const startHackCompletionJob = () => {
  nodeCron.schedule("*/30 * * * * *", async () => {
    try {
      const completed = await completeExpiredHacks();

      if (completed.length > 0) {
        console.log(
          `[HackCompletionJob] Completed ${completed.length} hack(s)`
        );
        const completedTargets = completed.map((hack) => hack.target);
        for (const target of completedTargets) {
          const ok = await deleteScannedNodeByName(target);
          if (!ok) {
            console.log("error deleting a scanned node");
            return;
          }
        }
      }
    } catch (error) {
      console.error("Error processing hack completions:", error);
    }
  });

  console.log(
    "🕐 Hack completion job started - checking hacks every 30 seconds."
  );
};
