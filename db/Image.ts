import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Annotations } from "./Annotations";
import { Appointment } from "./Appointment";

@Entity()
export default class Image {
  @PrimaryKey()
  id!: number;

  @Property({ type: "string" })
  url!: string;

  @OneToOne({ inversedBy: "image", orphanRemoval: true, nullable: true })
  annotations: Annotations;

  @ManyToOne({ entity: () => Appointment }, { nullable: true })
  appointment: Appointment | any;

  @Property({ type: "date", nullable: true })
  createdAt!: Date;
}
