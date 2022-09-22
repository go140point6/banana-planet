import { oneLine } from "common-tags";
import { Message } from "discord.js";
import { Weapon as BaseWeapon } from "discordjs-rpg";
import { Player } from "../structure/Player";

export abstract class Weapon extends BaseWeapon {
  abstract price: number;
  description = oneLine`Weapon is used to increase player’s attack stat. Max 2
  weapons can be equipped.`;

  static get all(): Weapon[] {
    return [
      new Stick(),
      new Rocks(),
      new Scissors(),
      new LaserPointer(),
      new Blaster(),
      new Lightsaber(),
      new AR(),
      new Bomb(),
      new Gauntlet(),
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
      player.equippedWeapons.some(x => x.id === this.id)
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

exports.Weapon = Weapon;
class Stick extends Weapon {
  id = "stick";
  name = "Stick";
  attack = 1;
  price = 0;
}

class Rocks extends Weapon {
  id = "rocks";
  name = "Bag o' Rocks";
  attack = 3;
  price = 30;
}

class Scissors extends Weapon {
  id = "scissors";
  name = "Scissors";
  attack = 5;
  price = 100;
}

class LaserPointer extends Weapon {
  id = "laserpointer";
  name = "Laser Pointer";
  attack = 10;
  price = 250;
}

class Blaster extends Weapon {
  id = "blaster";
  name = "Blaster";
  attack = 15;
  price = 500;
}

class Lightsaber extends Weapon {
  id = "lightsaber";
  name = "Lightsaber";
  attack = 20;
  price = 1000;
}

class AR extends Weapon {
  id = "AR";
  name = "Ape's AR";
  attack = 30;
  price = 2000;
}

class Bomb extends Weapon {
  id = "bomb";
  name = "Banana Bomb";
  attack = 40;
  price = 3000;
}

class Gauntlet extends Weapon {
  id = "gauntlet";
  name = "Infinity Gauntlet";
  attack = 45;
  price = 3500;
}
