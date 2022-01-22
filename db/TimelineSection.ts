import { ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import Timeline from "./Timeline";

export default class TimelineSection {
  @PrimaryKey()
  id: number;

  @ManyToOne({ entity: () => Timeline, nullable: true })
  timeline: Timeline | any;

  @Property({ type: "date" })
  date: Date;

  @Property()
  comments: string;
}
