import { Fighter } from "discordjs-rpg";
import { currency } from "../utils";
import { Defense, Heal, Rage, Luck, Damage } from "../structure/Skill";
import { BabyApe, BearableGuy, RichDuck, Bae, PunkWorldsArt, PhoenixEgg, BearableBull, Fanatics, Eros, SilverSurfer, Darkseid, Media } from "./Pet";

export abstract class Boss extends Fighter {
  abstract drop: number;
  abstract xpDrop: number;

  static get all(): Boss[] {
    return [
      new Apocalypse("Apocalypse"),
      new Thanos("Thanos"),
      new Galactus("Galactus"),
      new DarkPhoenix("Dark Phoenix"),
      new JJonahJameson("J. Jonah Jameson"),
    ];
  }

  show() {
    const embed = super.show();

    embed.addField(`${currency} Drop`, `${this.drop}`, true);
    embed.addField(`XP Drop`, `${this.xpDrop}`, true);

    return embed;
  }
}

export class Apocalypse extends Boss {
  drop = 600;
  xpDrop = 500;
  attack = 500;
  hp = 550;
  armor = 0.3;
  critChance = 0.1;
  critDamage = 3;
  imageUrl = "https://www.listchallenges.com/f/items/aa29bbdf-ddd9-4544-b895-1aa5f77b2cd4.jpg";
  
  constructor(name: string) {
    super(name);

    const skill = new Rage(); 
    skill.setOwner(this);

    const pet = new Fanatics()
    pet.setOwner(this);
  }
}

export class Thanos extends Boss {
  drop = 1200;
  xpDrop = 800;
  attack = 1200;
  hp = 1420;
  armor = 0.35;
  critChance = 0.2;
  critDamage = 3.4;
  imageUrl = "https://www.listchallenges.com/f/items/ce8cf83b-8bfe-448e-a4a7-b54153ea2aa2.jpg"

  constructor(name: string) {
    super(name);

    const skill = new Defense(); 
    skill.setOwner(this);

    const pet = new Eros()
    pet.setOwner(this);
  }
}

export class Galactus extends Boss {
  drop = 1750;
  xpDrop = 1000;
  attack = 2350;
  hp = 2570;
  armor = 0.39;
  critChance = 0.3;
  critDamage = 3.8;
  imageUrl = "https://www.listchallenges.com/f/items/676ad1ae-3ad3-4225-9526-f5e8c2fd9515.jpg";

  
  constructor(name: string) {
    super(name);

    const skill = new Heal(); 
    skill.setOwner(this);

    const pet = new SilverSurfer()
    pet.setOwner(this);
  }
}

export class DarkPhoenix extends Boss {
  drop = 2250;
  xpDrop = 1250;
  attack = 2750;
  hp = 3000;
  armor = 0.49;
  critChance = 0.4;
  critDamage = 4.5;
  imageUrl = "https://www.listchallenges.com/f/items/27bc26e6-fca9-4252-bfd1-6abf33c8f3e5.jpg";

  
  constructor(name: string) {
    super(name);

    const skill = new critDamage(); 
    skill.setOwner(this);

    const pet = new Darkseid()
    pet.setOwner(this);
  }
}

export class JJonahJameson extends Boss {
  drop = 3000;
  xpDrop = 2000;
  attack = 3500;
  hp = 5000;
  armor = 0.59;
  critChance = 0.5;
  critDamage = 5.5;
  imageUrl = "https://www.listchallenges.com/f/items/9bf800b2-de67-4560-b8dd-8bf33ce71968.jpg";

  
  constructor(name: string) {
    super(name);

    const skill = new critChance(); 
    skill.setOwner(this);

    const pet = new Media()
    pet.setOwner(this);
  }
}
