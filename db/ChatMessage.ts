import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Chat } from "./Chat";

@Entity()
export class ChatMessage {
  @PrimaryKey()
  id: number;

  @Property()
  text!: string;

  @Property()
  createdAt: string;

  @Property()
  user_auth_id: string;

  @ManyToOne({ entity: () => Chat, nullable: true })
  chat: Chat | any;
}
