import nodeCron from "node-cron";
import { purchaseMarketItems } from "../db/queries/marketItems.js";

export const startMarketItemsPurchasingJob = () => {
  nodeCron.schedule("*/30 * * * * *", async () => {
    try {
      const purchased = await purchaseMarketItems();
      if (purchased.length > 0) {
        console.log(
          `[MarketItemsPurchasingJob] bought ${purchased.length} item(s)`
        );
      }
    } catch (error) {
      console.error("Error buying market items.", error);
    }
  });

  console.log(
    "🕐 Market items purchasing job started - checking market every 30 seconds."
  );
};
