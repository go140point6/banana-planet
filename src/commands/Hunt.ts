import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { Player } from "../structure/Player";
import { Battle } from "discordjs-rpg";
import { Monster } from "../structure/Monster";
import { bold, currency, random } from "../utils";
import { ButtonHandler } from "@jiman24/discord.js-button";

class SearchMonster extends ButtonHandler {
  player: Player;
  _msg: Message;

  constructor(msg: Message, embed: MessageEmbed | string, player: Player) {
    super(msg, embed);
    this._msg = msg;
    this.player = player;
  }

  async search(cb: (monster: Monster) => Promise<void>) {

    const monster = new Monster(this.player);
    const button = new ButtonHandler(this._msg, monster.show(this.player))

    button.addButton("search again", () => this.search(cb))
    button.addButton("battle", () => cb(monster))
    button.addCloseButton();

    await button.run();
  }
}

export default class extends Command {
  name = "oogi";
  description = "start hunting";
  block = true;

  async exec(msg: Message) {

    const player = Player.fromUser(msg.author);
    const search = new SearchMonster(msg, "", player);

    await search.search(async monster => {

      const battle = new Battle(msg, random.shuffle([player, monster]));
      battle.interval = process.env.ENV === "DEV" ? 1000 : 3000;
      const winner = await battle.run();
      player.hunt++;

      if (winner.id === player.id) {

        const currLevel = player.level;
        const levelDrop = ((currLevel * monster.drop)/2);
        const levelXpDrop = ((currLevel * monster.xpDrop)/2);
        player.addXP(levelXpDrop);
        player.coins += (levelDrop);
        console.log("Banana: " + levelDrop); //debug
        console.log("XP " + levelXpDrop); //debug
        player.win++;

        msg.channel.send(`${player.name} has earned ${bold(levelDrop)} ${currency}!`);
        msg.channel.send(`${player.name} has earned ${bold(levelXpDrop)} xp!`);

        if (currLevel !== player.level) {
          msg.channel.send(`${player.name} is now on level ${bold(player.level)}!`);
        }
      } 

      player.save();
      this.release(player.id);

    })

  }
}
