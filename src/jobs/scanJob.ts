import nodeCron, { ScheduledTask } from "node-cron";
import {
  createScannedNode,
  getScannedNodesByUserId,
} from "../db/queries/scannedNodes.js";
import { TARGETS } from "../gamedata.js";

// userId to scan task
const userScanTasks: Record<string, ScheduledTask> = {};

const scanNetwork = async (userId: string) => {
  const userNodes = await getScannedNodesByUserId(userId);
  const userNodesNames = userNodes?.map((node) => node.name);
  const potentialNodes = Object.keys(TARGETS).filter(
    (nodeName) => !userNodesNames?.includes(nodeName)
  );

  // no more scanning left to do
  if (potentialNodes.length === 0) {
    console.log("nothing left to scan");
    return;
  }

  console.log({ potentialNodes });
  const randomIndex = Math.floor(Math.random() * potentialNodes.length);
  const randomNodeName = potentialNodes[randomIndex];
  if (!randomNodeName) {
    throw new Error(
      `no randomNodeName found. potentialNodes: ${potentialNodes} | potentialNodes.length: ${potentialNodes.length} | randomIndex: ${randomIndex}`
    );
  }

  const createdScannedNode = await createScannedNode({
    name: randomNodeName,
    userId: userId,
  });
  if (!createdScannedNode) {
    throw new Error("couldn't create scanned node");
  }

  console.log(`Node ${createdScannedNode.name} has been scanned.`);
};

export const startUserScanTask = (userId: string) => {
  // task already running
  if (userScanTasks[userId]) {
    return false;
  }
  const scanTask = nodeCron.schedule("*/30 * * * * *", async () => {
    try {
      console.log("Network scan initiated.");
      await scanNetwork(userId);
    } catch (error) {
      console.error("Error scanning network:", error);
    }
  });
  userScanTasks[userId] = scanTask;
  return true;
};

export const stopUserScanTask = (userId: string) => {
  const task = userScanTasks[userId];
  if (task) {
    task.stop();
    delete userScanTasks[userId];
    return true;
  }
  console.log("Network scan terminated.");
  return false;
};
