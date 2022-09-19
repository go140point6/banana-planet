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
import { client } from "..";
import { DateTime } from "luxon";

export default class extends Command {
  name = "boss";
  description = "fight boss";
  max = 5;
  //waitTime = 1000 * 60 * 60; //debug
  waitTime = 10 * 60 * 60;

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

        const duration = client.lastBossKilled.diffNow(["minutes"]);
        const minutes = Math.abs(duration.minutes);
        const timeLeft = client.lastBossKilled.plus({ minutes: 1 }).toRelative(); //debug minutes: 10

        // if less than 10 mins
        if (minutes < 1) { // debug 10
          msg.channel.send(`You can run the boss command again ${timeLeft}`);
          return;
        } else {
          client.lastBossKilled = DateTime.now();
        }

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

            if (players.length == 3) {
              selectedBoss.hp = Math.ceil((selectedBoss.hp * players.length)/1.75);
              selectedBoss.attack = Math.ceil((selectedBoss.attack * players.length)/1.75);

              msg.channel.send(`Maybe you shouldn't have done that ${user.username}, ${selectedBoss.name} just got stronger!` );
              msg.channel.send(`${selectedBoss.name}'s HP increased to ${bold(selectedBoss.hp)}!`);
              msg.channel.send(`${selectedBoss.name}'s Attack increased to ${bold(selectedBoss.attack)}!`);
            }

            if (players.length == 2) {
              selectedBoss.hp = Math.ceil((selectedBoss.hp * players.length)/1.5);
              selectedBoss.attack = Math.ceil((selectedBoss.attack * players.length)/1.5);
              console.log("Initial: " + (selectedBoss.armor));
              selectedBoss.armor = ((selectedBoss.armor * players.length)/1.5);
              console.log("Boosted: " + (selectedBoss.armor));
              //selectedBoss.armor = (selectedBoss.armor / 1.5);
              //console.log("Reduced: " + (selectedBoss.armor));
            
              msg.channel.send(`Maybe you shouldn't have done that ${user.username}, ${selectedBoss.name} just got stronger!`);
              msg.channel.send(`${selectedBoss.name}'s HP increased to ${bold(selectedBoss.hp)}!`);
              msg.channel.send(`${selectedBoss.name}'s Attack increased to ${bold(selectedBoss.attack)}!`);
              msg.channel.send(`${selectedBoss.name}'s Armor increased to ${bold(selectedBoss.armor)}!`);
            }

            if (players.length == 4) {
              selectedBoss.hp = Math.ceil((selectedBoss.hp * players.length)/1.25);
              selectedBoss.attack = Math.ceil((selectedBoss.attack * players.length)/1.25);
              selectedBoss.armor = Math.ceil((selectedBoss.armor * players.length)/1.25);
              selectedBoss.critChance = Math.ceil((selectedBoss.critChance * players.length)/1.25);
            
              msg.channel.send(`Maybe you shouldn't have done that ${user.username}, ${selectedBoss.name} just got stronger!`);
              msg.channel.send(`${selectedBoss.name}'s HP increased to ${bold(selectedBoss.hp)}!`);
              msg.channel.send(`${selectedBoss.name}'s Attack increased to ${bold(selectedBoss.attack)}!`);
              msg.channel.send(`${selectedBoss.name}'s Armor increased to ${bold(selectedBoss.armor)}!`);
              msg.channel.send(`${selectedBoss.name}'s chance of Critical Hit increased to ${bold(selectedBoss.critChance)}!`);
            }

            if (players.length == 5) {
              selectedBoss.hp = Math.ceil((selectedBoss.hp * players.length)/1);
              selectedBoss.attack = Math.ceil((selectedBoss.attack * players.length)/1);
              selectedBoss.armor = Math.ceil((selectedBoss.armor * players.length)/1);
              selectedBoss.critChance = Math.ceil((selectedBoss.critChance * players.length)/1);
              selectedBoss.critDamage = Math.ceil((selectedBoss.critDamage * players.length)/1);
            
              msg.channel.send(`Maybe you shouldn't have done that ${user.username}, ${selectedBoss.name} just got stronger!`);
              msg.channel.send(`${selectedBoss.name}'s HP increased to ${bold(selectedBoss.hp)}!`);
              msg.channel.send(`${selectedBoss.name}'s Attack increased to ${bold(selectedBoss.attack)}!`);
              msg.channel.send(`${selectedBoss.name}'s Armor increased to ${bold(selectedBoss.armor)}!`);
              msg.channel.send(`${selectedBoss.name}'s chance of Critical Hit increased to ${bold(selectedBoss.critChance)}!`);
              msg.channel.send(`${selectedBoss.name}'s Critical Hit Damage increased to ${bold(selectedBoss.critDamage)}!`);
            }

          } catch (err) {
            const errMsg = (err as Error).message;
            msg.channel.send(`${user} ${errMsg}`);
          }

        })

        await joinMenu.run();

        //console.log("Number of players: " + players.length); //debug

        const battle = new Battle(msg, random.shuffle([...players, selectedBoss]));
        selectedBoss.hp = Math.ceil((selectedBoss.hp * players.length)/1.5);
        console.log("New HP is " + selectedBoss.hp);
        selectedBoss.attack = Math.ceil((selectedBoss.attack * players.length)/1.5);
        console.log("New Attack is " + selectedBoss.attack);
        battle.setBoss(selectedBoss);

        const winner = await battle.run();

        if (winner.id !== selectedBoss.id) {

          const { drop, xpDrop } = selectedBoss;
          const sharedDrop = Math.ceil(drop / players.length);
          const sharedXpDrop = Math.ceil(xpDrop / players.length);

          for (const player of players) {

            const currLevel = player.level;
            player.addXP(sharedXpDrop);
            player.coins += sharedDrop;
            player.win++;

            msg.channel.send(`${selectedBoss.name} dropped ${bold(drop)} ${currency} and provided ${bold(xpDrop)} xp total.`);
            msg.channel.send(`${player.name}'s share is ${bold(sharedDrop)} ${currency}!`);
            msg.channel.send(`${player.name}'s share is ${bold(sharedXpDrop)} xp!`);

            if (currLevel !== player.level) {
              msg.channel.send(`${player.name} is now on level ${bold(player.level)}!`);
            }

            player.save();
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
