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

        const levelDrop = Math.max(parseFloat((Math.ceil((currLevel * monster.drop)/monster.relative) / monster.diff).toFixed()),5);
        const levelDropNoob = levelDrop * 2;
        const levelXpDrop = Math.max(parseFloat((Math.ceil((currLevel * monster.xpDrop)/monster.relative) / monster.diff).toFixed()),2);
        const levelXpDropNoob = levelXpDrop * 2;
        if (currLevel < 6) {
          //console.log("XP: " + levelXpDrop); //debug
          //console.log("XP Noob: " + levelXpDropNoob); //debug
          player.addXP(levelXpDropNoob);
          player.coins += (levelDropNoob);
          //console.log("Banana: " + levelDrop); //debug
          //console.log("Banana Noob: " + levelDropNoob); //debug
        } else {
          player.addXP(levelXpDrop);
          player.coins += (levelDrop);
          }
        //console.log("Unmodified Banana: " + monster.drop);
        //console.log("Player Level Mod Banana: " + (Math.ceil((currLevel * monster.drop)/ monster.relative)));
        //console.log("Final Banana: " + levelDrop);
        //console.log("Unmodified XP: " + monster.xpDrop);
        //console.log("Player Level Mod XP: " + (Math.ceil((currLevel * monster.xpDrop)/ monster.relative)));
        //console.log("XP " + levelXpDrop);
        player.win++;

        if (monster.relative == 5) {
          msg.channel.send(`${player.name} was much stronger than ${monster.name}, so earned significantly less ${currency} and xp!`);
        }
        if (monster.relative == 4) {
          msg.channel.send(`${player.name} was a little stronger than ${monster.name}, so earned a little less ${currency} and xp!`);
        }
        if (monster.relative == 3) {
          msg.channel.send(`${player.name} was evenly matched with ${monster.name}, so earned unmodified ${currency} and xp!`);
        }
        if (monster.relative == 2) {
          msg.channel.send(`${player.name} was a little weaker than ${monster.name}, so earned a little more ${currency} and xp!`);
        }
        if (monster.relative == 1) {
          msg.channel.send(`${player.name} was much weaker than ${monster.name}, so earned significantly more ${currency} and xp!`);
        }
        if (currLevel < 6) {
          msg.channel.send(`${player.name} has earned ${bold(levelDropNoob)} ${currency}!`);
          msg.channel.send(`${player.name} has earned ${bold(levelXpDropNoob)} xp!`);
        } else {
        msg.channel.send(`${player.name} has earned ${bold(levelDrop)} ${currency}!`);
        msg.channel.send(`${player.name} has earned ${bold(levelXpDrop)} xp!`);
        }

        if (currLevel !== player.level) {
          msg.channel.send(`${player.name} is now on level ${bold(player.level)}!`);
        }
      } 

      player.save();
      this.release(player.id);

    })

  }
}
