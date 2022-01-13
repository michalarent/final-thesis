import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Appointment } from "./Appointment";
import Patient from "./Patient";
import WoundFormData from "./WoundFormData";

@Entity()
export class Wound {
  @PrimaryKey()
  id: number;

  @Property({ type: "jsonb" })
  woundFormData: Record<string, any> = {};

  @OneToOne({ inversedBy: "wound", orphanRemoval: true, nullable: true })
  woundData: WoundFormData;

  @ManyToOne({ entity: () => Patient }, { nullable: true })
  patient: Patient | any;

  @OneToMany(
    () => Appointment,
    (app) => app.wound,
    { mappedBy: "wound", orphanRemoval: true, nullable: true }
  )
  appointments = new Collection<Appointment>(this);
}
