import { Fighter, Skill as BaseSkill } from "discordjs-rpg";
import { Message, MessageEmbed } from "discord.js";
import { oneLine } from "common-tags";
import { formatPercent, code } from "../utils";
import { Player } from "./Player";

export abstract class Skill extends BaseSkill {
  abstract price: number;
  description = oneLine`Skill will enhance your stat (temporarily) during
  battle. The enhancements will lose its effects once the battle is finished.`;

  static get all(): Skill[] {
    return [
      new Rage(),
      new Heal(),
      new Defense(),
      new Luck(),
      new Damage(),
    ];
  }

  async buy(msg: Message) {

    const player = Player.fromUser(msg.author);

    if (player.coins < this.price) {
      msg.channel.send("Insufficient amount");
      return;
    }

    if (
      player.inventory.some(x => x.id === this.id) ||
      player.skill?.id === this.id
    ) {
      msg.channel.send("You already own this skill");
      return;
    }

    player.coins -= this.price;
    player.inventory.push(this);

    player.save();
    msg.channel.send(`Successfully bought **${this.name}**`);
  }
}

export class Rage extends Skill {
  name = "Ape Rage";
  id = "rage";
  description = "Does double damage when activated temporarily";
  price = 10_000;
  interceptRate = 0.2;

  use(p1: Fighter, _p2: Fighter) {
    //console.log("Before: " + p1.attack);
    p1.attack *= 2;
    //console.log("After: " + p1.attack);

    const embed = new MessageEmbed()
      .setTitle("Skill interception")
      .setColor("GREEN")
      .setDescription(
        oneLine`${p1.name} uses **${this.name} Skill** and increases their
        strength to ${code(p1.attack)}!`
      )

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;
  }

  close(p1: Fighter, _p2: Fighter) {
    p1.attack /= 2;
    //console.log("Done: " + p1.attack);
  }
}

export class Heal extends Skill {
  name = "Ape Heal";
  id = "heal";
  description = "Heals 10% of hp when activated";
  price = 10_000;
  interceptRate = 0.2; //debug 0.2

  use(p1: Fighter, _p2: Fighter) {
    
    const healAmount = Math.ceil(p1.hp * 0.1);
    //console.log("p1.hp " + p1.hp);
    //console.log("healAmount: " + healAmount);
    p1.hp += healAmount;

    const embed = new MessageEmbed()
      .setTitle("Skill interception")
      .setColor("GREEN")
      .setDescription(
        oneLine`${p1.name} uses **${this.name} Skill** and heals
        ${code(healAmount)}HP !`
      )

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed; 
  }

  close(p1: Fighter, _p2: Fighter) {
    //p1.hp *= 0.8;
    //console.log("Done: " + p1.hp);
  }
}

export class Defense extends Skill {
  name = "Ape Defense";
  id = "defense";
  description = "Double armor when activated";
  price = 10_000;
  interceptRate = 0.2;

  use(p1: Fighter, _p2: Fighter) {

    //console.log("Before " + p1.armor);
    p1.armor *= 2;
    //console.log("After " + p1.armor);

    const embed = new MessageEmbed()
      .setTitle("Skill interception")
      .setColor("GREEN")
      .setDescription(
        oneLine`${p1.name} uses **${this.name} Skill** and increases armor to
        ${code(formatPercent(p1.armor))}!`
      )

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;
  }

  close(_p1: Fighter, _p2: Fighter) {
    //console.log("Almost Done " + _p1.armor);
    _p1.armor /= 2;
    //console.log("Done: " + _p1.armor);
   }
}

export class Luck extends Skill {
  name = "Ape Luck";
  id = "luck";
  description = "Increase critical chance by 5% when activated";
  price = 10_000;
  interceptRate = 0.2;

  use(p1: Fighter, _p2: Fighter) {

    //console.log("Before " + p1.critChance);
    const critChanceAmount = p1.critChance + 0.05;
    p1.critChance += critChanceAmount;
    //console.log("After " + p1.critChance);

    const embed = new MessageEmbed()
      .setTitle("Skill interception")
      .setColor("GREEN")
      .setDescription(
        oneLine`${p1.name} uses **${this.name} Skill** and increases their
        chance of a critcal hit by ${code(formatPercent(critChanceAmount))} !`
      )

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;
  }

  close(_p1: Fighter, _p2: Fighter) { }
}

export class Damage extends Skill {
  name = "Ape Crtical Damage";
  id = "damage";
  description = "Increases critDamage by x1.5 when activated";
  price = 10_000;
  interceptRate = 0.2;

  use(p1: Fighter, _p2: Fighter) {

    //console.log("Before " + p1.critDamage);
    p1.critDamage *= 1.5;
    //console.log("After " + p1.critDamage);

    const embed = new MessageEmbed()
      .setTitle("Skill interception")
      .setColor("GREEN")
      .setDescription(
        oneLine`${p1.name} uses **${this.name} Skill** and increases the damage
        done by a crtical hit to ${code(p1.critDamage.toFixed(2))}!`
      )

    if (this.imageUrl)
      embed.setThumbnail(this.imageUrl);

    return embed;
  }

  close(p1: Fighter, _p2: Fighter) {
    p1.critDamage /= 1.5;
    //console.log("Done: " + p1.critDamage);
    }
  }
