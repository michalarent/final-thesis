import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import Timeline from "./Timeline";

@Entity()
export default class TimelineEvent {
  @PrimaryKey()
  id!: number;

  @Property()
  date!: Date;

  @Property()
  comments?: string;

  @Property()
  type!: "video" | "request" | "chat" | "checkup" | "appointment";

  @Property()
  name: string;

  @ManyToOne({ entity: () => Timeline, nullable: true })
  timeline: Timeline | any;
}
