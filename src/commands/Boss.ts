import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { Boss } from "../structure/Boss";
import { Player } from "../structure/Player";
import { 
  bold, 
  currency, 
  random, 
  toNList, 
  validateIndex, 
  validateNumber,
} from "../utils";
import { ButtonHandler } from "@jiman24/discord.js-button";
import { Battle } from "discordjs-rpg";
import { oneLine } from "common-tags";

export default class extends Command {
  name = "boss";
  description = "fight boss";
  max = 5;
  waitTime = 1000 * 60 * 60;

  async exec(msg: Message, args: string[]) {

    const player = Player.fromUser(msg.author);
    const boss = Boss.all;
    
    const [arg1] = args;
    
    if (arg1) {

      const index = parseInt(arg1) - 1;
      validateNumber(index)
      validateIndex(index, boss);

      const selectedBoss = boss[index];
      const menu = new ButtonHandler(msg, selectedBoss.show());
      const players: Player[] = [];

      menu.addButton("battle", async () => {

        const bossEmbed = selectedBoss.show();
        bossEmbed.setDescription(
          oneLine`${player.name} wants to battle ${selectedBoss.name}. Click
          join to participate max ${this.max} players`
        );

        const joinMenu = new ButtonHandler(msg, bossEmbed)
          .setTimeout(this.waitTime)
          .setMultiUser(this.max);

        joinMenu.addButton("join", (user) => {

          try {

            const player = Player.fromUser(user);

            players.push(player);

            msg.channel.send(
              `${user.username} joined! (${players.length}/${this.max} players)`
            );

          } catch (err) {
            const errMsg = (err as Error).message;
            msg.channel.send(`${user} ${errMsg}`);
          }

        })

        await joinMenu.run();

        const battle = new Battle(msg, random.shuffle([...players, selectedBoss]));
        battle.setBoss(selectedBoss);

        const winner = await battle.run();

        if (winner.id !== selectedBoss.id) {

          const { drop, xpDrop } = selectedBoss;

          for (const player of players) {

            const currLevel = player.level;
            player.addXP(xpDrop);
            player.coins += drop;
            player.win++;

            msg.channel.send(`${player.name} has earned ${bold(drop)} ${currency}!`);
            msg.channel.send(`${player.name} has earned ${bold(xpDrop)} xp!`);

            if (currLevel !== player.level) {
              msg.channel.send(`${player.name} is now on level ${bold(player.level)}!`);
            }
          }

        }
      })

      menu.addCloseButton();

      await menu.run();

      return;
    }

    const bossList = toNList(boss.map(x => x.name));

    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("Boss")
      .setDescription(bossList)

    msg.channel.send({ embeds: [embed] });
  }
}
