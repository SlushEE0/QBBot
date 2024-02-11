export type type_command = {
  name: string;
  description?: string;
  options?: {
    type: CommandOptionsTypes;
    name: string;
    description: string;
    required?: boolean;
    choices: { name: string; value: string | number }[];
  }[];
  type?: CommandType;
};

export enum CommandOptionsTypes {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11
}

export enum CommandType {
  CHAT_INPUT = 1,
  USER = 2,
  MESSAGE = 3
}
