import type { Request, Response } from "express";
import { InteractionResponseType } from "discord-interactions";

import "dotenv/config";
import { InstallGlobalCommands } from "./utils.js";
import {
  CommandOptionsTypes,
  CommandType,
  type type_command
} from "./types.js";

type interactionFunc = (
  req: Request,
  res: Response
) => Response<any, Record<string, any>>;

let cmdList: type_command[] = [];
export let interaction: {
  name: string;
  func: interactionFunc;
}[] = [];

export function addCommand(cmd: type_command, func: interactionFunc) {
  cmdList.push(cmd as type_command);

  interaction.push({
    name: cmd.name,
    func
  });
}

addCommand(
  {
    name: "quiz",
    description: "Ill ask you a question!",
    options: [
      {
        name: "category",
        description: "Pick your category",
        required: false,
        choices: [],
        type: CommandOptionsTypes.STRING
      }
    ],
    type: CommandType.CHAT_INPUT
  },
  (req, res) => {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: JSON.stringify("I ran /quiz")
      }
    });
  }
);

addCommand(
  {
    name: "test",
    description: "return request obj",
    type: CommandType.CHAT_INPUT
  },
  (req, res) => {
    return res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: JSON.stringify(req?.body)
      }
    });
  }
);

export default function registerCommands() {
  InstallGlobalCommands(process.env.APP_ID, cmdList);
}
