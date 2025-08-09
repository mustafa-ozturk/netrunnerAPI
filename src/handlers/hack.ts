import { Request, Response } from "express";
import { getBearerToken, validateJWT } from "../auth.js";
import { config } from "../config.js";
import {
  createHack,
  extractHackById,
  extractHackByIdForced,
  getHackById,
} from "../db/queries/hacks.js";
import { NewHack } from "../db/schema.js";
import { respondWithError, respondWithJSON } from "../json.js";
import { createItem } from "../db/queries/items.js";
import { ITEMS_MAP } from "../items.js";
import { addEurodollars, addExperience } from "../db/queries/stats.js";
import { DIFFICULTY_TO_DURATION_MAP, TARGETS } from "../gamedata.js";
import { BadRequestError } from "../error.js";

export const handlerStartHack = async (req: Request, res: Response) => {
  const { targetId } = req.params;
  const token = getBearerToken(req);
  const userID = validateJWT(token, config.jwt.secret);

  const target = TARGETS[targetId];
  if (!target) {
    throw new BadRequestError("Target doesn't exist");
  }

  const hackDuration = DIFFICULTY_TO_DURATION_MAP[target.difficulty];

  const hackDetails = await createHack(userID, target.id, hackDuration);
  if (!hackDetails) {
    throw new Error("Couldn't start hack");
  }

  respondWithJSON(res, 201, {
    id: hackDetails.id,
    userId: hackDetails.userId,
    createdAt: hackDetails.createdAt,
    updatedAt: hackDetails.updatedAt,
    completesAt: hackDetails.completesAt,
    status: hackDetails.status,
    target: target.id,
  } satisfies NewHack);
};

export const handlerGetHackById = async (req: Request, res: Response) => {
  const { hackID } = req.params;
  const token = getBearerToken(req);
  validateJWT(token, config.jwt.secret);

  const hackDetails = await getHackById(hackID);
  if (!hackDetails) {
    throw new Error("Couldnt get hack");
  }

  respondWithJSON(res, 200, {
    id: hackDetails.id,
    userId: hackDetails.userId,
    createdAt: hackDetails.createdAt,
    updatedAt: hackDetails.updatedAt,
    completesAt: hackDetails.completesAt,
    status: hackDetails.status,
    target: hackDetails.target,
  } satisfies NewHack);
};

type extractResponseType = {
  message: string;
  exp: number;
  items: string[];
  eurodollars: number;
};

export const handlerExtractHackById = async (req: Request, res: Response) => {
  const { hackId } = req.params;
  // TODO: force should only work if user is admin
  const force = req.query.force || false;
  const token = getBearerToken(req);
  const userId = validateJWT(token, config.jwt.secret);

  const hackDetails = await getHackById(hackId);
  if (!hackDetails) {
    return respondWithError(res, 404, "Hack operation not found.");
  }

  if (hackDetails.userId !== userId) {
    return respondWithError(res, 403, "Access denied.");
  }

  if (!force && hackDetails.status === "Extracted") {
    return respondWithError(
      res,
      409,
      "Payload already extracted from this hack."
    );
  }

  if (!force && hackDetails.status === "In Progress") {
    return respondWithError(
      res,
      409,
      "Hack operation not ready for extraction."
    );
  }

  // set the hack to extracted
  if (force) {
    const extracted = await extractHackByIdForced(hackId);
    if (!extracted) {
      throw new Error("could not extract hack");
    }
  } else {
    const extracted = await extractHackById(hackId);
    if (!extracted) {
      throw new Error("could not extract hack");
    }
  }

  let extractResponse: extractResponseType = {
    message: "Payload extraction failed.",
    exp: 0,
    items: [],
    eurodollars: 0, // possible fines/bail ?
  };
  // TODO: chance of being traced
  // check if they will get a reward
  const target = TARGETS[hackDetails.target];
  const successfulExtraction = force
    ? true
    : hackExtracted(target.difficulty as keyof typeof hackDifficulties);
  if (successfulExtraction) {
    extractResponse = getHackExtractionRewards(
      target.difficulty as keyof typeof hackDifficulties,
      target.possibleLoot
    );

    if (extractResponse.items.length > 0) {
      const item = ITEMS_MAP[extractResponse.items[0]];

      await createItem({
        itemName: item.name,
        itemType: item.type,
        description: item.description,
        quantity: 1,
        userId: userId,
      });

      const addedEurodollars = await addEurodollars(
        userId,
        extractResponse.eurodollars
      );
      if (!addedEurodollars) {
        throw new Error("couldn't add eurodollars");
      }

      const addedExperience = await addExperience(userId, extractResponse.exp);
      if (!addedExperience) {
        throw new Error("couldnt add experience");
      }
    }
  }

  respondWithJSON(res, 200, extractResponse);
};

export const hackDifficulties = {
  legendary: 1000, // 10%
  hard: 750, // 25%
  medium: 500, // 50%
  easy: 0, // 100%
};
export const hackDifficultyToExp = {
  legendary: 1000,
  hard: 750,
  medium: 500,
  easy: 250,
};

export const hackDifficultyToEurodollars = {
  legendary: 3000,
  hard: 2250,
  medium: 1500,
  easy: 500,
};

export const hackExtracted = (difficulty: keyof typeof hackDifficulties) => {
  const difficultyValue = hackDifficulties[difficulty];
  // minimum of 10% success rate
  const minimumSuccessRate = 10;
  const scalingFactor = 10;

  const successRate = Math.max(
    minimumSuccessRate,
    100 - difficultyValue / scalingFactor
  );
  const randomNum = Math.floor(Math.random() * 100); // 0-99 (100 values)

  if (randomNum > successRate) {
    return false;
  }

  return true;
};

export const getHackExtractionRewards = (
  difficulty: keyof typeof hackDifficulties,
  targetPossibleLoot: string[]
): extractResponseType => {
  // for now just earn one item max
  // TODO: should be able to earn more iterms on bigger difficulties
  const randomIndex = Math.round(Math.random() * targetPossibleLoot.length);
  const item = targetPossibleLoot[randomIndex];
  return {
    message: "Payload extracted successfully.",
    exp: hackDifficultyToExp[difficulty],
    items: [item],
    eurodollars: hackDifficultyToEurodollars[difficulty],
  };
};
