import {
  Collection,
  Entity,
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

  @OneToMany({
    entity: () => ChatMessage,
    mappedBy: "chat",
    orphanRemoval: true,
  })
  messages = new Collection<ChatMessage>(this);
}
