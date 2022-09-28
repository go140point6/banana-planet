import { Fighter } from "discordjs-rpg";
import { currency, random } from "../utils";
import { Defense, Heal, Rage, Luck, Damage } from "../structure/Skill";
import { Fanatics, Lawyers, SilverSurfer, Darkseid, Media } from "./Pet";

export abstract class Boss extends Fighter {
  abstract drop: number;
  abstract xpDrop: number;

  static get all(): Boss[] {
    return [
      new Grewal("Grewal Demon Lord"),
      new Berkovitz("Berkovitz Zombie Prime"),
      new Clayton("Clayton Lich King"),
      new Hinman("Undead Commander Hinman"),
      new Gensler("Gensler Overlord")
    ];
  }

  show() {
    const embed = super.show();

    embed.addField(`${currency} Drop`, "?", true);
    embed.addField(`XP Drop`, "?", true);

    return embed;
  }
}

export class Grewal extends Boss {
  drop = random.integer(300, 700);
  xpDrop = random.integer(150, 300);
  attack = 69;
  hp = 270;
  armor = 0.15;
  critChance = 0.1;
  critDamage = 1.5;
  imageUrl = "https://images2.imgbox.com/b7/4a/KoDR0kki_o.jpg";
  
  constructor(name: string) {
    super(name);

    const skill = new Rage();
    skill.setOwner(this); //debug

    const pet = new Fanatics();
    pet.setOwner(this); //debug
  }
}

export class Berkovitz extends Boss {
  drop = random.integer(500, 900);
  xpDrop = random.integer(250, 500);
  attack = 79;
  hp = 270;
  armor = 0.12;
  critChance = 0.12;
  critDamage = 1.3;
  imageUrl = "https://images2.imgbox.com/b0/64/HjlHRGac_o.jpg"

  constructor(name: string) {
    super(name);

    const skill = new Defense(); 
    skill.setOwner(this);

    const pet = new Lawyers()
    pet.setOwner(this);
  }
}

export class Clayton extends Boss {
  drop = random.integer(700, 1100);
  xpDrop = random.integer(350, 750);
  attack = 102;
  hp = 310;
  armor = 0.142;
  critChance = 0.2;
  critDamage = 1.5;
  imageUrl = "https://images2.imgbox.com/4a/2e/tGWo43NR_o.jpg";

  
  constructor(name: string) {
    super(name);

    const skill = new Heal(); 
    skill.setOwner(this);

    const pet = new SilverSurfer()
    pet.setOwner(this);
  }
}

export class Hinman extends Boss {
  drop = random.integer(900, 1300);
  xpDrop = random.integer(450, 900);
  attack = 130;
  hp = 350;
  armor = 0.175;
  critChance = 0.3;
  critDamage = 1.8;
  imageUrl = "https://images2.imgbox.com/68/b0/yU7sgdol_o.jpg";

  
  constructor(name: string) {
    super(name);

    const skill = new Damage(); 
    skill.setOwner(this);

    const pet = new Darkseid()
    pet.setOwner(this);
  }
}

export class Gensler extends Boss {
  drop = random.integer(1100, 1500);
  xpDrop = random.integer(550, 1100);
  attack = 153;
  hp = 390;
  armor = 0.2;
  critChance = 0.35;
  critDamage = 2.0;
  imageUrl = "https://images2.imgbox.com/26/27/m8m6uJC4_o.jpg";

  
  constructor(name: string) {
    super(name);

    const skill = new Luck(); 
    skill.setOwner(this);

    const pet = new Media()
    pet.setOwner(this);
  }
}
