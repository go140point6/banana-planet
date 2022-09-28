import { oneLine } from "common-tags";
import { Message } from "discord.js";
import { Armor as BaseArmor } from "discordjs-rpg";
import { Player } from "../structure/Player";

export abstract class Armor extends BaseArmor {
  abstract price: number;
  description = oneLine`Armors is used to increase player’s armor stat. Max
  armor can be equipped by a player is 9.`;

  static get all(): Armor[] {
    return [
      new EyePatch(),
      new MouthGuard(),
      new Cup(),
      new Boots(),
      new Gloves(),
      new Leggings(),
      new ArmCovers(),
      new Helmet(),
      new ChestPlate(),
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
      player.equippedArmors.some(x => x.id === this.id)
    ) {
      msg.channel.send("You already own this item");
      return;
    }

    player.coins -= this.price;
    player.inventory.push(this);

    player.save();
    msg.channel.send(`Successfully bought **${this.name}**`);
  }
}

exports.Armor = Armor;
export class EyePatch extends Armor {
  id = "patch";
  name = "Eye Patch";
  price = 10;
  armor = 0.002
}

export class MouthGuard extends Armor {
  id = "guard";
  name = "Mouth Guard";
  price = 50;
  armor = 0.004
}

export class Cup extends Armor {
  id = "cup";
  name = "Jock Strap and Cup";
  price = 100;
  armor = 0.006
}

export class Boots extends Armor {
  id = "boots";
  name = "Baby Ape Boots";
  price = 250;
  armor = 0.008
}

export class Gloves extends Armor {
  id = "gloves";
  name = "Diamond Gloves";
  price = 500;
  armor = 0.01
}

export class Leggings extends Armor {
  id = "leggings";
  name = "Rocket Pants";
  price = 1000;
  armor = 0.012
}

export class ArmCovers extends Armor {
  id = "armcovers";
  name = "Cactus Arm Covers";
  price = 2500;
  armor = 0.015
}

export class Helmet extends Armor {
  id = "helmet";
  name = "Cerebro Helmet";
  price = 5000;
  armor = 0.018
}

export class ChestPlate extends Armor {
  id = "chestplate";
  name = "Arc Reactor Plate";
  price = 10000;
  armor = 0.025
}
