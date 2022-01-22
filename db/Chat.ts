import User from "./User";
import { Doctor } from "./Doctor";
import Patient from "./Patient";

import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { ChatMessage } from "./ChatMessage";

@Entity()
export class Chat {
  @PrimaryKey()
  id!: number;

  @Property()
  user_1: string;

  @Property()
  user_2: string;

  @ManyToOne({ entity: () => Patient, inversedBy: "chats" })
  patient: Patient | any;

  @ManyToOne({ entity: () => Doctor, inversedBy: "chats" })
  doctor: Doctor | any;

  @OneToMany({
    entity: () => ChatMessage,
    mappedBy: "chat",
    orphanRemoval: true,
  })
  messages = new Collection<ChatMessage>(this);
}
