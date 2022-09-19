import { oneLine } from "common-tags";
import { Message } from "discord.js";
import { Pet as BasePet } from "discordjs-rpg";
import { Player } from "./Player";

export abstract class SideKick extends BasePet {
  abstract price: number;
  description = oneLine`Pet will be your companion during battle. It will attack
  the opponent based on its intercept rate.`;

  static get all(): PlayerSideKick[] {
    return [
      new BabyApe(),
      new BearableGuy(),
      new RichDuck(),
      new Bae(),
      new PunkWorldsArt(),
      new PhoenixEgg(),
      new BearableBull(),
    ];
  }

  static get all(): MonsterSideKick[] {
    return [
      new EvilBabyApe(),
      new EvilBearableGuy(),
      new EvilRichDuck(),
      new EvilBae(),
      new EvilPunkWorldsArt(),
      new EvilPhoenixEgg(),
      new EvilBearableBull(),
    ];
  }

  static get all(): BossSideKick[] {
    return [
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

export class BabyApe extends PlayerSideKick {
  name = "Baby Ape";
  id = "bape";
  attack = 20;
  price = 13000;
  boss = false;
}

export class BearableGuy extends PlayerSideKick {
  name = "Bearable Guy";
  id = "guy";
  attack = 30;
  interceptRate = 0.2;
  price = 15000;
  boss = false;
}

export class RichDuck extends PlayerSideKick {
  name = "Rich Duck";
  id = "duck";
  attack = 40;
  interceptRate = 0.25;
  price = 20000;
  boss = false;
}

export class Bae extends PlayerSideKick {
  name = "Bae";
  id = "bae";
  attack = 50;
  interceptRate = 0.3;
  price = 30000;
  boss = false;
}

export class PunkWorldsArt extends PlayerSideKick {
  name = "Sentient Punk Worlds Art";
  id = "punkworld";
  attack = 60;
  interceptRate = 0.35;
  price = 70000;
  boss = false;
}

export class PhoenixEgg extends PlayerSideKick {
  name = "Phoenix Egg";
  id = "egg";
  attack = 70;
  interceptRate = 0.4;
  price = 100000;
  boss = false;
}

export class BearableBull extends PlayerSideKick {
  name = "Bearable Bull";
  id = "bull";
  attack = 80;
  interceptRate = 0.45;
  price = 160000;
  boss = false;
}

export class EvilBabyApe extends MonsterSideKick {
  name = "Evil Baby Ape";
  id = "ebape";
  attack = 20;
  price = 13000;
  boss = false;
}

export class EvilBearableGuy extends MonsterSideKick {
  name = "Evil Bearable Guy";
  id = "eguy";
  attack = 30;
  interceptRate = 0.2;
  price = 15000;
  boss = false;
}

export class EvilRichDuck extends MonsterSideKick {
  name = "Evil Rich Duck";
  id = "educk";
  attack = 40;
  interceptRate = 0.25;
  price = 20000;
  boss = false;
}

export class EvilBae extends MonsterSideKick {
  name = "Evil Bae";
  id = "ebae";
  attack = 50;
  interceptRate = 0.3;
  price = 30000;
  boss = false;
}

export class EvilPunkWorldsArt extends MonsterSideKick {
  name = "Evil Sentient Punk Worlds Art";
  id = "epunkworld";
  attack = 60;
  interceptRate = 0.35;
  price = 70000;
  boss = false;
}

export class EvilPhoenixEgg extends MonsterSideKick {
  name = "Evil Phoenix Egg";
  id = "eegg";
  attack = 70;
  interceptRate = 0.4;
  price = 100000;
  boss = false;
}

export class EvilBearableBull extends MonsterSideKick {
  name = "Evil Bearable Bull";
  id = "ebull";
  attack = 80;
  interceptRate = 0.45;
  price = 160000;
  boss = false;
}

export class Fanatics extends BossSideKick {
  name = "Religious Fanatics";
  id = "fanatics";
  attack = 100;
  interceptRate = 0.15;
  price = 1000000000;
  boss = true;
}

export class Eros extends BossSideKick {
  name = "Eros of Titan";
  id = "brother";
  attack = 200;
  interceptRate = 0.25;
  price = 1000000000;
  boss = true;
}

export class SilverSurfer extends BossSideKick {
  name = "Silver Surfer";
  id = "herald";
  attack = 300;
  interceptRate = 0.35;
  price = 1000000000;
  boss = true;
}

export class Darkseid extends BossSideKick {
  name = "Darkseid";
  id = "darkseid";
  attack = 400;
  interceptRate = 0.45;
  price = 1000000000;
  boss = true;
}

export class Media extends BossSideKick {
  name = "The Media - A lie repeated...";
  id = "media";
  attack = 500;
  interceptRate = 0.99;
  price = 1000000000;
  boss = true;
}