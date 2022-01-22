import {
  Collection,
  Entity,
  IdentifiedReference,
  OneToMany,
  OneToOne,
  PrimaryKey,
} from "@mikro-orm/core";
import TimelineEvent from "./TimelineEvent";
import TimelineSection from "./TimelineSection";
import { Treatment } from "./Treatment";

@Entity()
export default class Timeline {
  @PrimaryKey()
  id!: number;

  @OneToOne(
    () => Treatment,
    (treatment) => treatment.timeline
  )
  treatment: Treatment | any;

  @OneToMany({ entity: () => TimelineSection, mappedBy: "timeline" })
  timelineSections = new Collection<TimelineSection>(this);

  @OneToMany({ entity: () => TimelineEvent, mappedBy: "timeline" })
  timelineEvents = new Collection<TimelineEvent>(this);
}
