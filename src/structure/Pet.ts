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
      new BabyApe(),
      new BearableGuy(),
      new RichDuck(),
      new Bae(),
      new PunkWorldsArt(),
      new PhoenixEgg(),
      new BearableBull(),
      new Fanatics(),
      new Eros(),
      new SilverSurfer(),
      new Darkseid(),
      new Media(),
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

export class BabyApe extends SideKick {
  name = "Baby Ape";
  id = "bape";
  attack = 20;
  price = 13000;
}

export class BearableGuy extends SideKick {
  name = "Bearable Guy";
  id = "guy";
  attack = 30;
  interceptRate = 0.2;
  price = 15000;
}

export class RichDuck extends SideKick {
  name = "Rich Duck";
  id = "duck";
  attack = 40;
  interceptRate = 0.25;
  price = 20000;
}

export class Bae extends SideKick {
  name = "Baa";
  id = "bae";
  attack = 50;
  interceptRate = 0.3;
  price = 30000;
}

export class PunkWorldsArt extends SideKick {
  name = "Sentient Punk Worlds Art";
  id = "punkworld";
  attack = 60;
  interceptRate = 0.35;
  price = 70000;
}

export class PhoenixEgg extends SideKick {
  name = "Phoenix Egg";
  id = "egg";
  attack = 70;
  interceptRate = 0.4;
  price = 100000;
}

export class BearableBull extends SideKick {
  name = "Bearable Bull";
  id = "bull";
  attack = 80;
  interceptRate = 0.45;
  price = 160000;
}

export class Fanatics extends SideKick {
  name = "Religious Fanatics";
  id = "fanatics";
  attack = 100;
  interceptRate = 0.15;
  price = 1000000000;
}

export class Eros extends SideKick {
  name = "Eros of Titan";
  id = "brother";
  attack = 200;
  interceptRate = 0.25;
  price = 1000000000;
}

export class SilverSurfer extends SideKick {
  name = "Silver Surfer";
  id = "herald";
  attack = 300;
  interceptRate = 0.35;
  price = 1000000000;
}

export class Darkseid extends SideKick {
  name = "Darkseid";
  id = "darkseid";
  attack = 400;
  interceptRate = 0.45;
  price = 1000000000;
}

export class Media extends SideKick {
  name = "The Media - A lie repeated...";
  id = "media";
  attack = "500";
  interceptRate = 0.99;
  price = 1000000000;
}