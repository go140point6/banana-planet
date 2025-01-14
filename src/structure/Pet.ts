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

export abstract class MonsterSideKick extends BasePet {
  abstract price: number;
  description = oneLine`Pets tht can only be used by Monsters.`;

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
}

export abstract class BossSideKick extends BasePet {
  abstract price: number;
  description = oneLine`Pets that can only be used by Bosses.`;
  
  static get all(): BossSideKick[] {
    return [
      new Fanatics(),
      new Lawyers(),
      new Lawsuit(),
      new PaperShredder(),
      new Vitalik(),
    ];
  }
}

export class BabyApe extends SideKick {
  name = "Baby Ape";
  id = "bape";
  attack = 20;
  price = 2000;
}

export class BearableGuy extends SideKick {
  name = "Bearable Guy";
  id = "guy";
  attack = 30;
  interceptRate = 0.12;
  price = 3000;
}

export class RichDuck extends SideKick {
  name = "Rich Duck";
  id = "duck";
  attack = 40;
  interceptRate = 0.13;
  price = 4000;
}

export class Bae extends SideKick {
  name = "Bae";
  id = "bae";
  attack = 50;
  interceptRate = 0.14;
  price = 5000;
}

export class PunkWorldsArt extends SideKick {
  name = "Sentient Punk Worlds Art";
  id = "punkworld";
  attack = 60;
  interceptRate = 0.15;
  price = 6000;
}

export class PhoenixEgg extends SideKick {
  name = "Phoenix Egg";
  id = "egg";
  attack = 70;
  interceptRate = 0.17;
  price = 7000;
}

export class BearableBull extends SideKick {
  name = "Bearable Bull";
  id = "bull";
  attack = 80;
  interceptRate = 0.2;
  price = 8000;
}

export class EvilBabyApe extends MonsterSideKick {
  name = "Evil Baby Ape";
  id = "ebape";
  attack = 20;
  price = 13000;
}

export class EvilBearableGuy extends MonsterSideKick {
  name = "Evil Bearable Guy";
  id = "eguy";
  attack = 30;
  interceptRate = 0.12;
  price = 15000;
}

export class EvilRichDuck extends MonsterSideKick {
  name = "Evil Rich Duck";
  id = "educk";
  attack = 40;
  interceptRate = 0.13;
  price = 20000;
}

export class EvilBae extends MonsterSideKick {
  name = "Evil Bae";
  id = "ebae";
  attack = 50;
  interceptRate = 0.14;
  price = 30000;
}

export class EvilPunkWorldsArt extends MonsterSideKick {
  name = "Evil Sentient Punk Worlds Art";
  id = "epunkworld";
  attack = 60;
  interceptRate = 0.15;
  price = 70000;
}

export class EvilPhoenixEgg extends MonsterSideKick {
  name = "Evil Phoenix Egg";
  id = "eegg";
  attack = 70;
  interceptRate = 0.17;
  price = 100000;
}

export class EvilBearableBull extends MonsterSideKick {
  name = "Evil Bearable Bull";
  id = "ebull";
  attack = 80;
  interceptRate = 0.2;
  price = 160000;
}

export class Fanatics extends BossSideKick {
  name = "Civil Servants";
  id = "fanatics";
  attack = 88;
  interceptRate = 0.1;
  price = 1000000000;
}

export class Lawyers extends BossSideKick {
  name = "Government Attorneys";
  id = "lawyers";
  attack = 123;
  interceptRate = 0.12;
  price = 1000000000;
}

export class Lawsuit extends BossSideKick {
  name = "A Lawsuit on the way out the door";
  id = "lawsuit";
  attack = 177;
  interceptRate = 0.15;
  price = 1000000000;
}

export class PaperShredder extends BossSideKick {
  name = "Sentient Document Shredder";
  id = "memos";
  attack = 253;
  interceptRate = 0.18;
  price = 1000000000;
}

export class Vitalik extends BossSideKick {
  name = "A lap dog named Vitalik";
  id = "vitalik";
  attack = 346;
  interceptRate = 0.2;
  price = 1000000000;
}