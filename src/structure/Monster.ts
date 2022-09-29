import { Fighter } from "discordjs-rpg";
import { code, currency, random } from "../utils";
import { Player } from "./Player";
import { Skill } from "./Skill";
import { MonsterSideKick } from "./Pet";

export class Monster extends Fighter {
  drop = random.integer(5, 25);
  xpDrop = random.integer(3, 5);
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
    const jitterMax = (Math.abs(this.playerCritDamage * this.jitter));
    const finalRandom = (random.integer(jitterMin, jitterMax));
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
  "Agent A",
  "Agent C",
  "Agent D",
  "Agent E",
  "Agent H",
  "Agent J",
  "Agent K",
  "Agent L",
  "Agent M",
  "Agent O",
  "Agent P",
  "Agent T",
  "Agent W",
  "Agent X",
  "Chief Alpha",
  "Chief Zed",
  "High T",
  "Frank"
]

const images = {
  "Agent A": "https://static.wikia.nocookie.net/men-in-black/images/4/43/Pitbull_back-in-timemib3.jpg",
  "Agent C": "https://static.wikia.nocookie.net/men-in-black/images/d/d7/Agent_C_%28MIB_International%29.png",
  "Agent D": "https://static.wikia.nocookie.net/men-in-black/images/2/2e/Pro_d.jpg",
  "Agent E": "https://static.wikia.nocookie.net/men-in-black/images/5/51/AgentE.jpg",
  "Agent H": "https://static.wikia.nocookie.net/men-in-black/images/9/9b/CA9309A9-FFFC-41FE-BA7A-4ADF8B98CFD4.jpeg",
  "Agent J": "https://static.wikia.nocookie.net/men-in-black/images/f/f8/Agent_J.jpg",
  "Agent K": "https://static.wikia.nocookie.net/men-in-black/images/c/cb/Agent_K.jpg",
  "Agent L": "https://static.wikia.nocookie.net/men-in-black/images/4/46/383538-l_one_large.jpg",
  "Agent M": "https://static.wikia.nocookie.net/men-in-black/images/b/b9/1107783_1405479766187_500_281.jpg",
  "Agent O": "https://static.wikia.nocookie.net/men-in-black/images/3/3b/Agent_O_MIB_International.png",
  "Agent P": "https://static.wikia.nocookie.net/men-in-black/images/d/d7/Men-In-Black-Alien-Crisis_TINIMA20120526_0224_5.jpg",
  "Agent T": "https://static.wikia.nocookie.net/men-in-black/images/9/95/Agent_T.png",
  "Agent W": "https://static.wikia.nocookie.net/men-in-black/images/8/83/Andy_W_Warhol.jpg",
  "Agent X": "https://static.wikia.nocookie.net/men-in-black/images/5/58/Agent_x.jpg",
  "Chief Alpha": "https://static.wikia.nocookie.net/men-in-black/images/a/ac/Alpha.PNG",
  "Chief Zed": "https://static.wikia.nocookie.net/men-in-black/images/0/0b/Zed.jpg",
  "High T": "https://static.wikia.nocookie.net/men-in-black/images/e/ec/High_t.jpg",
  "Frank": "https://static.wikia.nocookie.net/men-in-black/images/8/87/Frank_MIB.png"
}