import { Fighter } from "discordjs-rpg";
import { code, currency, random } from "../utils";
import { Player } from "./Player";
import { Skill } from "./Skill";
import { MonsterSideKick } from "./Pet";

export class Monster extends Fighter {
  drop = random.integer(45, 65);
  xpDrop = random.integer(4, 6);
  difficulty: number;
  monsterDiff: number;
  playerDiff: number;
  diff: number;
  finalDiff: number;
  relative: number;
  jitter: number;
  playerAttack: number;
  playerHP: number;
  playerArmor: number;
  playerCritChance: number;
  playerCritDamage: number;

  constructor(player: Player) {
    super(random.pick(names));
    this.imageUrl = images[this.id];
    this.difficulty = player.level;
    this.monsterDiff = 0;
    this.playerDiff = 0;
    this.diff = 0;
    this.finalDiff = 0;
    this.relative = 0;
    this.playerAttack = player.attack;
    this.playerHP = player.hp;
    this.playerArmor = player.armor * 100;
    this.playerCritChance = player.critChance * 100;
    this.playerCritDamage = player.critDamage * 100;

    if (this.difficulty > 21) {
      this.jitter = 0.05 // 5%
    } else {
      this.jitter = 0.025 // 2.5%
    }

    if (this.difficulty < 6) {
      this.attack = player.attack + this.randomAttribNoob();
      this.hp = player.hp + this.randomAttribNoob();
      this.armor = player.armor + (this.randomAttribNoob() / 100);
      this.critChance = player.critChance + (this.randomAttribNoob() / 100);
      this.critDamage = Math.max((player.critDamage + (this.randomAttribNoob() / 10)), 1.1);
    } 
    
    if (this.difficulty > 5) {
      this.attack = player.attack + this.randomAttack();
      this.hp = player.hp + this.randomHP();
      this.armor = player.armor + (this.randomArmor() / 100);
      this.critChance = player.critChance + (this.randomCritChance() / 100);
      this.critDamage = Math.max((player.critDamage + (this.randomCritDamage() / 10)), 1.1);
    }
    
    if (player.skill && random.bool()) {
      const skill = random.pick(Skill.all);
      skill.setOwner(this);
    }

    if (player.pet && random.bool()) {
      const pet = random.pick(MonsterSideKick.all);
      pet.setOwner(this);
    }  

    this.monsterDiff = (this.attack + this.hp + (Math.round(this.armor * 1000)) + (Math.round(this.critChance * 100)) + (Math.round(this.critDamage * 100)));
    //console.log("MonsterDiff: " + this.monsterDiff);
    this.playerDiff = (player.attack + player.hp + (player.armor * 1000) + (player.critChance * 100) + (Math.round(player.critDamage * 100)));
    //console.log("PlayerDiff " + this.playerDiff);
    this.diff = parseFloat((this.playerDiff / this.monsterDiff).toFixed(2));
    if (this.diff > 1) {
      //console.log("Player is stronger!");
      if (this.diff >= 1.05) {
        this.relative = 5;
      } else {
        this.relative = 4;
      }
    }
    if (this.diff < 1) {
      //console.log("Player is weaker!");
      if (this.diff >= 0.95) {
        this.relative = 2;
      } else {
        this.relative = 1;
      }
    }
    if (this.diff == 1) {
      //console.log("Player and Monster are evenly matched");
      this.relative = 3;
    }
    //console.log("Monster Attack: " + this.attack);
    //console.log("Player Attack: " + player.attack);
    //console.log("Monster HP: " + this.hp);
    //console.log("Player HP: " + player.hp);
    //console.log("Monster Armor: " + Math.round(this.armor * 1000));
    //console.log("Player Armor: " + Math.round(player.armor * 1000));
    //console.log("Monster critChance: " + Math.round(this.critChance * 100));
    //console.log("Player critChance: " + Math.round(player.critChance * 100));
    //console.log("Monster critDamage: " + Math.round(this.critDamage * 100));
    //console.log("Player critDamage: " + Math.round(player.critDamage * 100));
    //console.log("Monster Total: " + this.monsterDiff);
    //console.log("Player Total: " + this.playerDiff);
    //console.log(player.name + " :diff: " + this.diff);
    //console.log(player.name + " :relative: " + this.relative);
  }

  private randomAttribNoob() {
    return random.integer(-3, this.difficulty);
  }

  private randomAttack() {
    const jitterMin = -Math.abs(this.playerAttack * this.jitter);
    const jitterMax = Math.abs(this.playerAttack * this.jitter);
    const finalRandom = random.integer(jitterMin, jitterMax);
    return finalRandom;
  }

  private randomHP() {
    const jitterMin = -Math.abs(this.playerHP * this.jitter);
    const jitterMax = Math.abs(this.playerHP * this.jitter);
    const finalRandom = random.integer(jitterMin, jitterMax);
    return finalRandom;
  }

  private randomArmor() {
    const jitterMin = -Math.abs(this.playerArmor * this.jitter);
    const jitterMax = Math.abs(this.playerArmor * this.jitter);
    const finalRandom = random.integer(jitterMin, jitterMax);
    return finalRandom;
  }

  private randomCritChance() {
    const jitterMin = -Math.abs(this.playerCritChance * this.jitter);
    const jitterMax = Math.abs(this.playerCritChance * this.jitter);
    const finalRandom = random.integer(jitterMin, jitterMax);
    return finalRandom;
  }

  private randomCritDamage() {
    const jitterMin = (-Math.abs(this.playerCritDamage * this.jitter));
    const jitterMax = Math.min((Math.abs(this.playerCritDamage * this.jitter)), 4);
    const finalRandom = (random.integer(jitterMin, jitterMax));
    //console.log("Min " + jitterMin);
    //console.log("Max " + jitterMax);
    //console.log("Fin " + finalRandom);
    return finalRandom;
  }

  show(player?: Player) {
    const profile = super.show(player);

    profile.addField(`${currency} Drop `, "?", true);
    profile.addField("xp Drop ", "?", true);

    return profile;
  }
}

const names = [
  "baby ape karen",
  "baby ape jojo",
  "baby ape kevin",
  "baby ape johnson",
  "baby ape rawbee",
  "baby ape richard",
  "baby ape courtney",
  "baby ape eric",
  "baby ape sudo",
  "baby ape jimmy",
  "baby ape jack",
  "baby ape steven",
  "baby ape eri",
  "baby ape jimbob",
  "baby ape ben",
  "baby ape alex",
  "baby ape cora",
  "baby ape marissa",
  "baby ape patrick",
]

const images = {
  "baby ape karen": "https://imgbox.com/GhCu1MDC",
  "baby ape jojo": "https://imgbox.com/j6cJyb5R",
  "baby ape kevin": "https://imgbox.com/XP7iABqK",
  "baby ape johnson": "https://imgbox.com/9nf3ESiE",
  "baby ape rawbee": "https://imgbox.com/cDuXSBxG",
  "baby ape richard": "https://imgbox.com/5SfmtK30",
  "baby ape courtney": "https://imgbox.com/I6Iy4X7Q",
  "baby ape eric": "https://imgbox.com/KUCwHK4u",
  "baby ape sudo": "https://imgbox.com/lovaIL9C",
  "baby ape jimmy": "https://imgbox.com/Lti60mKB",
  "baby ape jack": "https://imgbox.com/YwGdgO3n",
  "baby ape steven": "https://imgbox.com/txNroGoK",
  "baby ape eri": "https://imgbox.com/WVs8M7OA",
  "baby ape jimbob": "https://imgbox.com/aooMjeiN",
  "baby ape ben": "https://imgbox.com/PbVjQl42",
  "baby ape alex": "https://imgbox.com/QIwP77yx",
  "baby ape cora": "https://imgbox.com/XHXyMQ9g",
  "baby ape marissa": "https://imgbox.com/KMG7Yewk",
  "baby ape patrick": "https://imgbox.com/2Xz5i5DA",
}