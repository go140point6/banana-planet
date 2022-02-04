import { Command } from "@jiman24/commandment";
import { Message, PermissionResolvable } from "discord.js";
import { client } from "..";

export default class extends Command {
  name = "resetleaderboard";
  permissions: PermissionResolvable[] = [];

  async exec(msg: Message) {
    client.leaderboard.deleteAll();
    msg.channel.send(`Successfully reset leaderboard`);
  }
}
