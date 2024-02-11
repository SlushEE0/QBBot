import express from "express";
import type { Request, Response } from "express";
import { InteractionType, InteractionResponseType } from "discord-interactions";

import "dotenv/config";
import { PORT } from "./utils/config";
import { authorize } from "./utils/utils";
import registerCommands, { interaction } from "./utils/registerCommands";

const app = express();

app.use(express.json({ verify: authorize(process.env.PUBLIC_KEY) }));

app.post("/api/interactions", async function (req: Request, res: Response) {
  const { type, id, data } = req.body;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    const reqInteraction = interaction.find((command) => command.name === name);

    if (reqInteraction) {
      reqInteraction.func(req, res);
    }
  }
});

app.get("/", async (req: Request, res: Response) => {
  res.send("<p>Some html</p>");
});

app.listen(PORT, () => {
  registerCommands();
  console.log("Listening on port", PORT);
});
