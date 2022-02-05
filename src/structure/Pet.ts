import { oneLine } from "common-tags";
import { Message } from "discord.js";
import { Pet as BasePet } from "discordjs-rpg";
import { Player } from "./Player";

export abstract class SideKick extends BasePet {
  abstract price: number;
  description = oneLine`Pet will be your companion during battle. It will attack
  the opponent based on its intercept rate.`;

  static get all(): SideKick[] {
    return [
      new Blob(),
      new Slime(),
      new Phoenix(),
      new Titanoboa(),
    ];
  }

  async buy(msg: Message) {

    const player = Player.fromUser(msg.author);

    if (player.coins < this.price) {
      msg.channel.send("Insufficient amount");
      return;
    }

    if (player.inventory.some(x => x.id === this.id)) {
      msg.channel.send("You already own this item");
      return;
    }

    player.coins -= this.price;
    player.inventory.push(this);

    player.save();
    msg.channel.send(`Successfully bought **${this.name}**!`);
  }
}

export class Blob extends SideKick {
  name = "Goku";
  id = "blob";
  attack = 20;
  price = 13000;
}

export class Slime extends SideKick {
  name = "King Kong";
  id = "slime";
  attack = 30;
  interceptRate = 0.2;
  price = 15000;
}

export class Phoenix extends SideKick {
  name = "John Wick";
  id = "phoenix";
  attack = 40;
  interceptRate = 0.2;
  price = 15000;
}

export class Titanoboa extends SideKick {
  name = "The Phoenix";
  id = "titan-o-boa";
  attack = 50;
  interceptRate = 0.4;
  price = 30000;
}

export class BeardedDragon extends SideKick {
  name = "Bearded Dragon";
  id = "bearded-dragon";
  attack = 60;
  interceptRate = 0.1;
  price = 70000;
}

export class BabyDragon extends SideKick {
  name = "Baby Dragon";
  id = "baby-dragon";
  attack = 20;
  interceptRate = 0.2;
  price = 55000;
}

export class Dog extends SideKick {
  name = "Dog";
  id = "dog";
  attack = 10;
  interceptRate = 0.35;
  price = 60000;
}

