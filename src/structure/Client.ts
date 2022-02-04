import { CommandManager } from "@jiman24/commandment";
import { Client as DiscordClient } from "discord.js";
import Enmap from "enmap";
import { DateTime } from "luxon";

export class Client extends DiscordClient {
  players = new Enmap("Player");
  commandManager = new CommandManager(process.env.PREFIX || "!");
  lastBossKilled = DateTime.fromJSDate(new Date(2000, 1, 1));
  leaderboard = new Enmap("Leaderboard");
}
