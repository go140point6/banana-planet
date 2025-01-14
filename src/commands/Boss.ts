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
  //waitTime = 1000 * 60 * 60; //debug 1 hour?
  waitTime = 250 * 60 * 60; //debug 15 minutes
  //waitTime = 83 * 60 * 60; //debug 5 minutes
  //waitTime = 10 * 60 * 60; //debug 36 seconds

  async exec(msg: Message, args: string[]) {

    const player = Player.fromUser(msg.author);
    const boss = Boss.all;
    const normalizer = 0.75;
    const minLevel = 18;
    
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
        const timeLeft = client.lastBossKilled.plus({ minutes: 10 }).toRelative(); //debug 10 or 6

        // if less than 10 mins
        if (minutes < 10 ) { //debug 10 or 6
          msg.channel.send(`You can run the boss command again ${timeLeft}`);
          return;
        } else {
          client.lastBossKilled = DateTime.now();
        }

        const bossEmbed = selectedBoss.show();
        bossEmbed.setDescription(
          oneLine`${player.name} wants to battle ${selectedBoss.name}. Click
          join to participate max ${this.max} players. NOTE: Fight starts in 15 minutes`
        );

        const joinMenu = new ButtonHandler(msg, bossEmbed)
          .setTimeout(this.waitTime)
          .setMultiUser(this.max);

        joinMenu.addButton("join", (user) => {

          try {

            const player = Player.fromUser(user);

            // limit boss fights
            //let bully = (player.level - minLevel);
            //if (bully > 5) {
            //  msg.channel.send(
            //    `Hey ${user.username} don't be a bully!  Go pick on some boss your own size!`
            //  );
            //} else {
              players.push(player);

              msg.channel.send(
                `${user.username} joined! (${players.length}/${this.max} players)`
              );
            //}

            if (players.length == 2) {
              selectedBoss.hp = Math.ceil((selectedBoss.hp * players.length)/(normalizer+(players.length - 1)));
              selectedBoss.attack = Math.ceil((selectedBoss.attack * players.length)/(normalizer+(players.length - 1)));

              msg.channel.send(`Maybe you shouldn't have done that ${user.username}, ${selectedBoss.name} just got stronger!` );
              msg.channel.send(`${selectedBoss.name}'s HP increased to ${bold(selectedBoss.hp)}!`);
              msg.channel.send(`${selectedBoss.name}'s Attack increased to ${bold(selectedBoss.attack)}!`);
            }

            if (players.length == 3) {
              selectedBoss.hp = Math.ceil((selectedBoss.hp * players.length)/(normalizer+(players.length - 1)));
              selectedBoss.attack = Math.ceil((selectedBoss.attack * players.length)/(normalizer+(players.length - 1)));
              selectedBoss.armor = ((selectedBoss.armor * players.length)/(normalizer+(players.length - 1)));

              msg.channel.send(`Really ${user.username}?  Whelp, ${selectedBoss.name} just got stronger!`);
              msg.channel.send(`${selectedBoss.name}'s HP increased to ${bold(selectedBoss.hp)}!`);
              msg.channel.send(`${selectedBoss.name}'s Attack increased to ${bold(selectedBoss.attack)}!`);
              msg.channel.send(`${selectedBoss.name}'s Defense increased to ${bold(Math.round(selectedBoss.armor * 100))}%!`);
            }

            if (players.length == 4) {
              selectedBoss.hp = Math.ceil((selectedBoss.hp * players.length)/(normalizer+(players.length - 1)));
              selectedBoss.attack = Math.ceil((selectedBoss.attack * players.length)/(normalizer+(players.length - 1)));
              selectedBoss.armor = ((selectedBoss.armor * players.length)/(normalizer+(players.length - 1)));
              selectedBoss.critChance = ((selectedBoss.critChance * players.length)/(normalizer+(players.length - 1)));
            
              msg.channel.send(`Damn ${user.username}, you're not that bright... ${selectedBoss.name} just got stronger!`);
              msg.channel.send(`${selectedBoss.name}'s HP increased to ${bold(selectedBoss.hp)}!`);
              msg.channel.send(`${selectedBoss.name}'s Attack increased to ${bold(selectedBoss.attack)}!`);
              msg.channel.send(`${selectedBoss.name}'s Defense increased to ${bold(Math.round(selectedBoss.armor * 100))}%!`);
              msg.channel.send(`${selectedBoss.name}'s chance of Critical Hit increased to ${bold(Math.round(selectedBoss.critChance * 100))}%!`);
            }

            if (players.length == 5) {
              selectedBoss.hp = Math.ceil((selectedBoss.hp * players.length)/(normalizer+(players.length - 1)));
              selectedBoss.attack = Math.ceil((selectedBoss.attack * players.length)/(normalizer+(players.length - 1)));
              selectedBoss.armor = ((selectedBoss.armor * players.length)/(normalizer+(players.length - 1)));
              selectedBoss.critChance = ((selectedBoss.critChance * players.length)/(normalizer+(players.length - 1)));
              selectedBoss.critDamage = ((selectedBoss.critDamage * players.length)/(normalizer+(players.length - 1)));
            
              msg.channel.send(`It's your funeral ${user.username}, ${selectedBoss.name} just got stronger!`);
              msg.channel.send(`${selectedBoss.name}'s HP increased to ${bold(selectedBoss.hp)}!`);
              msg.channel.send(`${selectedBoss.name}'s Attack increased to ${bold(selectedBoss.attack)}!`);
              msg.channel.send(`${selectedBoss.name}'s Defense increased to ${bold(Math.round(selectedBoss.armor * 100))}%!`);
              msg.channel.send(`${selectedBoss.name}'s chance of Critical Hit increased to ${bold(Math.round(selectedBoss.critChance * 100))}%!`);
              msg.channel.send(`${selectedBoss.name}'s Critical Hit Damage increased to x${bold(selectedBoss.critDamage.toFixed(1))}!`);
            }

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

          var party = 0;

          for (const player of players) {
            party = (party + player.level);
          }

          const { drop, xpDrop } = selectedBoss;
          //console.log("Unmod banana: " + drop);
          //console.log("Unmod xp: " + xpDrop);
          const modDrop = Math.ceil((drop * players.length)/((players.length-1)+normalizer));
          const modXP = Math.ceil((xpDrop * players.length)/((players.length-1)+normalizer));
          //console.log("Mod banana: " + modDrop);
          //console.log("Mod xp: " + modXP);
          msg.channel.send(`${selectedBoss.name} dropped ${bold(modDrop)} ${currency} and provided ${bold(modXP)} xp total.`);

          for (const player of players) {

            const currLevel = player.level;
            const sharedDrop = Math.ceil(modDrop * (player.level / party));
            const sharedXpDrop = Math.ceil(modXP * (player.level / party));
            player.addXP(sharedXpDrop);
            //player.addXP(8000); //debug
            player.coins += sharedDrop;
            //player.coins += 200000; //debug
            //player.win++; //turn off Win/Hunt% for Boss battles

            msg.channel.send(`Since ${player.name} is level ${currLevel}, their share is ${bold(sharedDrop)} ${currency} and ${bold(sharedXpDrop)} xp!`);

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
