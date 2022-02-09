import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Annotations } from "./Annotations";
import { Appointment } from "./Appointment";
import { Wound } from "./Wound";

@Entity()
export default class Image {
  @PrimaryKey()
  id!: number;

  @Property({ type: "string" })
  url!: string;

  @OneToOne({ inversedBy: "image", orphanRemoval: true, nullable: true })
  annotations: Annotations;

  @ManyToOne({ entity: () => Wound }, { nullable: true })
  wound: Wound | any;

  @Property({ type: "date", nullable: true })
  createdAt!: Date;
}
