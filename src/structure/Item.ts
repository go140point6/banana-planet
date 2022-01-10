import { Message, MessageEmbed } from "discord.js";
import { Armor } from "./Armor";
import { Weapon } from "./Weapon";
import { SideKick } from "./Pet";
import { Skill } from "./Skill";

export abstract class Item {
  abstract name: string;
  abstract id: string;
  abstract price: number;
  abstract show(): MessageEmbed;
  abstract buy(msg: Message): void;
  static get all() {
    return [
      ...Armor.all,
      ...Weapon.all,
      ...SideKick.all,
      ...Skill.all,
    ];
  }
}
