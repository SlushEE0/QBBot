import express from "express";
import type { Request, Response } from "express";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes
} from "discord-interactions";

import "dotenv/config";
import { PORT } from "./utils/config";
import { authorize } from "./utils/utils";

const app = express();

app.use(express.json({ verify: authorize(process.env.PUBLIC_KEY) }));

app.post("/api/interactions", async function (req: Request, res: Response) {
  const { type, id, data } = req.body;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    if (name === "test") {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: JSON.stringify(req.body)
        }
      });
    }
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
