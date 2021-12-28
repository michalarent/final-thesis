import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Doctor } from "./Doctor";

import { Treatment } from "./Treatment";
import { Wound } from "./Wound";

@Entity()
export class Appointment {
  @PrimaryKey()
  public id: number;

  @ManyToOne({ entity: () => Wound }, { nullable: true })
  wound: Wound | any;

  @Property()
  date: Date;

  @Property({ type: "jsonb" })
  info: Record<string, any>;

  @ManyToMany(() => Treatment, (treatment) => treatment.appointments)
  treatments = new Collection<Treatment>(this);

  @ManyToOne({ entity: () => Doctor })
  doctor: Doctor;
}
