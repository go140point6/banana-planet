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
  "baby ape karen": "https://images2.imgbox.com/cc/d2/5dvuWVzS_o.jpg",
  "baby ape jojo": "https://images2.imgbox.com/50/f4/TxdxWLFb_o.jpg",
  "baby ape kevin": "https://images2.imgbox.com/14/70/OFNUQKxN_o.jpg",
  "baby ape johnson": "https://images2.imgbox.com/57/bd/oorcN3pQ_o.jpg",
  "baby ape rawbee": "https://images2.imgbox.com/a5/ce/An4rIsyP_o.jpg",
  "baby ape richard": "https://images2.imgbox.com/f1/94/bWjWwU7Z_o.jpg",
  "baby ape courtney": "https://images2.imgbox.com/07/79/WorOHN05_o.jpg",
  "baby ape eric": "https://images2.imgbox.com/60/2c/Tb4gAelu_o.jpg",
  "baby ape sudo": "https://images2.imgbox.com/1b/62/CfxJk0Ae_o.jpg",
  "baby ape jimmy": "https://images2.imgbox.com/62/a1/LlKvwih8_o.jpg",
  "baby ape jack": "https://images2.imgbox.com/cd/75/cSVbAkQA_o.jpg",
  "baby ape steven": "https://images2.imgbox.com/74/c9/zz2JDCff_o.jpg",
  "baby ape eri": "https://images2.imgbox.com/16/54/n5CzU5TH_o.jpg",
  "baby ape jimbob": "https://images2.imgbox.com/6f/0f/O8ds22jZ_o.jpg",
  "baby ape ben": "https://images2.imgbox.com/55/3c/O42PWCna_o.jpg",
  "baby ape alex": "https://images2.imgbox.com/46/3a/me83OtFz_o.jpg",
  "baby ape cora": "https://images2.imgbox.com/c7/be/GZnnRNm0_o.jpg",
  "baby ape marissa": "https://images2.imgbox.com/e5/dc/SXleAAHc_o.jpg",
  "baby ape patrick": "https://images2.imgbox.com/04/13/XdsJOaWP_o.jpg",
}