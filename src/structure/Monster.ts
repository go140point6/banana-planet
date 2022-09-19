import { Fighter } from "discordjs-rpg";
import { code, currency, random } from "../utils";
import { Player } from "./Player";
import { Skill } from "./Skill";
import { SideKick } from "./Pet";

export class Monster extends Fighter {
  drop = random.integer(10, 100);
  xpDrop = random.integer(10, 35);
  difficulty: number;
  constructor(player: Player) {
    super(random.pick(names));
    this.imageUrl = images[this.id];
    this.difficulty = player.level;
    this.critDamage = player.critDamage + random.real(0.01, 0.5);
    if (this.difficulty < 6) {
      this.attack = player.attack + this.randomAttribNoob();
      this.hp = player.hp + this.randomAttribNoob();
      this.armor = player.armor + (this.randomAttribNoob() / 100);
      this.critChance = player.critChance + (this.randomAttribNoob() / 100);
    } 
    
    if (this.difficulty > 5) {
      this.attack = player.attack + this.randomAttack();
      this.hp = player.hp + this.randomHP();
      this.armor = player.armor + (this.randomArmor() / 100);
      this.critChance = player.critChance + (this.randomCritChance() / 100);
    }
    
//    if (player.skill && random.bool()) {  //debug
//      const skill = random.pick(Skill.all);  //debug
//      skill.setOwner(this);  //debug
//    }  //debug

    if (player.pet && random.bool()) {
      const pet = random.pick(SideKick.all);
      pet.setOwner(this);
    }
  }

  private randomAttribNoob() {
    return random.integer(-5, this.difficulty);
  }

  private randomAttack() {
    return random.integer(-3, this.difficulty);
  }

  private randomHP() {
    return random.integer(-3, this.difficulty);
  }
  private randomArmor() {
    return random.integer(-3, this.difficulty);
  }
  private randomCritChance() {
    return random.integer(-3, this.difficulty);
  }

  show(player?: Player) {
    const profile = super.show(player);

    profile.addField(`${currency} Drop`, code(this.drop), false);
    profile.addField("xp Drop", code(this.xpDrop), false);

    return profile;
  }
}

const names = [
  "Doctor Doom"         ,
  "Magneto"             ,
  "Green Goblin"        ,
  "Red Skull"           ,
  "Loki"                ,
  "Ultron"              ,
  "Kingpin"             ,
  "Doctor Octopus"      ,
  "Venom"               ,
  "Kang the Conqueror"  ,
  "Mephisto"            ,
  "Dormammu"            ,
  "Mandarin"            ,
  "Leader"              ,
  "Baron Helmut Zemo"   ,
  "Sabertooth"          ,
  "Carnage"             ,
  "Bullseye"            ,
  "Mystique"            ,
  "Abomination"         ,
  "Modok"               ,
  "Annihilus"           ,
  "Juggernaut"          ,
  "Red Hulk"            ,
  "Super-Skrull"        ,
  "Mr Sinister"         ,
  "Baron Von Strucker"  ,
  "Onslaught"           ,
  "Immortus"            ,
  "Sentinels"           ,
  "Viper"               ,
  "Klaw"                ,
  "Wizard"              ,
  "Morgan Le Fay"       ,
  "Grandmaster"         ,
  "Magus"               ,
  "Enchantress"         ,
  "Lizard"              ,
  "Lady Deathstrike"    ,
  "Hobgloblin"          ,
  "Sandman"             ,
  "Electro"             ,
  "Selene"              ,
  "Mysterio"            ,
]

const images = {
  "Doctor Doom": "https://www.listchallenges.com/f/items/538eeae4-0738-4d9e-95c4-aa99318dcdeb.jpg",
  "Magneto": "https://www.listchallenges.com/f/items/b5aed5d4-1041-48e1-b249-27d31412d79a.jpg",
  "Green Goblin": "https://www.listchallenges.com/f/items/f2c138ec-b79e-4ef6-baf4-e6d5a27270ca.jpg",
  "Red Skull": "https://www.listchallenges.com/f/items/6169eff5-3f26-43b3-8cc7-03010dbaaba9.jpg",
  "Loki": "https://www.listchallenges.com/f/items/fb390cc6-0d14-4df8-8626-406d2a60a9b0.jpg",
  "Ultron": "https://www.listchallenges.com/f/items/a0d45118-3cea-4a3b-a562-553b04aae83b.jpg",
  "Kingpin": "https://www.listchallenges.com/f/items/c6529ca7-8a7d-4ea6-b298-17f69a3f2a80.jpg",
  "Doctor Octopus": "https://www.listchallenges.com/f/items/87f196ae-7c14-428b-9885-731811ca8e6e.jpg",
  "Venom": "https://www.listchallenges.com/f/items/209fa4c3-49cb-4cb5-ab79-6351af6fe39a.jpg",
  "Kang the Conqueror": "https://www.listchallenges.com/f/items/3967cab1-90ee-4cbb-be3e-5636c353ba0e.jpg",
  "Mephisto": "https://www.listchallenges.com/f/items/1186a3aa-1c62-4e6f-bbef-f017f7a4d056.jpg",
  "Dormammu": "https://www.listchallenges.com/f/items/54d0ecaf-dc5f-48b5-96a4-56b7a4082f90.jpg",
  "Mandarin": "https://www.listchallenges.com/f/items/9537be2c-09d1-456d-9c9e-06e9a2e126d0.jpg",
  "Leader": "https://www.listchallenges.com/f/items/cd1b9ed5-3648-4247-bf66-072f47a62d90.jpg",
  "Baron Helmut Zemo": "https://www.listchallenges.com/f/items/1735c557-06e8-49e3-bf8e-a4f0d88f3304.jpg",
  "Sabertooth": "https://www.listchallenges.com/f/items/023cda40-5e23-4dfb-ab5d-4b2ccaa23e50.jpg",
  "Carnage": "https://www.listchallenges.com/f/items/45fb0c05-04a6-44bc-8845-5bbf6935071e.jpg",
  "Bullseye": "https://www.listchallenges.com/f/items/7fae5ead-5dc8-451c-b2e9-d00002e330a1.jpg",
  "Mystique": "https://www.listchallenges.com/f/items-dl/88d46f04-dd57-4095-bce7-a44057b54b35.jpg",
  "Abomination": "https://www.listchallenges.com/f/items/66f3b6bc-088a-4846-b1b5-5335515f64c3.jpg",
  "Modok": "https://www.listchallenges.com/f/items/b240e76b-3cc1-4e6e-8d02-bd342a9bc237.jpg",
  "Annihilus": "https://www.listchallenges.com/f/items/59dc77d9-97c0-48f4-b713-330272da86a8.jpg",
  "Juggernaut": "https://www.listchallenges.com/f/items/f95b5710-76fc-4037-981e-a3c4cc43e214.jpg",
  "Red Hulk": "https://www.listchallenges.com/f/items/903e0c04-bac8-4592-9a82-8b9a5c61f8c3.jpg",
  "Super-Skrull": "https://www.listchallenges.com/f/items/c19efd63-77d8-4528-a1b3-d5d7379a9163.jpg",
  "Mr Sinister": "https://www.listchallenges.com/f/items/24d7d6f8-27f9-45b9-a5f2-d8839d8ac9b3.jpg",
  "Baron Von Strucker": "https://www.listchallenges.com/f/items/e6d5e8b2-a00b-4389-b8f3-948644986bd7.jpg",
  "Onslaught": "https://www.listchallenges.com/f/items/95e7770e-20b1-494d-a506-f354cf7521f3.jpg",
  "Immortus": "https://www.listchallenges.com/f/items/f2713d6b-1ff1-45a2-8295-020f2a48391c.jpg",
  "Sentinels": "https://www.listchallenges.com/f/items/a29b83cc-9444-4c8c-96ea-dbe54996a1eb.jpg",
  "Viper": "https://www.listchallenges.com/f/items/4791eb6e-c928-40a5-92f0-95ab5e1e212b.jpg",
  "Klaw": "https://www.listchallenges.com/f/items/4234b7c8-0da8-4388-aac4-c79b4469d190.jpg",
  "Wizard": "https://www.listchallenges.com/f/items/b0853bce-b66c-4726-a982-b3f30bb9433d.jpg",
  "Morgan Le Fay": "https://www.listchallenges.com/f/items/08a5cb4c-7060-4bba-9b88-6191a5d5713e.jpg",
  "Grandmaster": "https://www.listchallenges.com/f/items/cf4030a9-a110-4f79-b1b4-253246f858cd.jpg",
  "Magus": "https://www.listchallenges.com/f/items/58051f68-3220-4969-af7e-82b643fd9cd8.jpg",
  "Enchantress": "https://www.listchallenges.com/f/items/89ac80d7-986d-470c-8912-e8dadd3b53b5.jpg",
  "Lizard": "https://www.listchallenges.com/f/items/2a4c33bf-5543-4218-aa2c-9a3aee217828.jpg",
  "Lady Deathstrike": "https://www.listchallenges.com/f/items/f252dd84-ffa7-419c-b3f1-aafcc82cf313.jpg",
  "Hobgloblin": "https://www.listchallenges.com/f/items/9f2848b5-0a82-434c-ac19-bd748589e643.jpg",
  "Mysterio": "https://www.listchallenges.com/f/items/619a01af-2ccf-4a7c-8231-83df7a0c182d.jpg",
  "Sandman": "https://www.listchallenges.com/f/items/b74c71eb-83a6-4128-b9c0-977fd86eae87.jpg",
  "Electro": "https://www.listchallenges.com/f/items/c3ed1c41-dc3b-4615-873f-f5f6eba703e9.jpg",
  "Selene": "https://www.listchallenges.com/f/items/419f94aa-72e7-4e6b-9415-5536d220e1d7.jpg",
}