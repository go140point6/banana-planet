import { Command } from "@jiman24/commandment";
import { Message, PermissionResolvable } from "discord.js";
import { client } from "..";

export default class extends Command {
  name = "reset";
  permissions: PermissionResolvable[] = ["ADMINISTRATOR"];

  async exec(msg: Message) {

    client.players.deleteAll();
    msg.channel.send("Reset successful");

  }
}
