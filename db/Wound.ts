import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Appointment } from "./Appointment";
import Patient from "./Patient";

@Entity()
export class Wound {
  @PrimaryKey()
  id: number;

  @Property({ type: "jsonb" })
  woundFormData: Record<string, any> = {};

  @ManyToOne({ entity: () => Patient }, { nullable: true })
  patient: Patient | any;

  @OneToMany(() => Appointment, (app) => app.wound)
  appointments = new Collection<Appointment>(this);
}
