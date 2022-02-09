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
import { Treatment } from "./Treatment";
import WoundFormData from "./WoundFormData";
import Image from "./Image";

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

  @OneToMany({
    entity: () => Treatment,
    mappedBy: "wound",
    orphanRemoval: true,
  })
  treatments = new Collection<Treatment>(this);

  @OneToMany(
    () => Image,
    (img) => img.wound,
    {
      mappedBy: "wound",
      orphanRemoval: true,
      nullable: false,

      default: [],
    }
  )
  images = new Collection<Image>(this);

  @OneToMany(
    () => Appointment,
    (app) => app.wound,
    { mappedBy: "wound", orphanRemoval: true, nullable: true }
  )
  appointments = new Collection<Appointment>(this);
}
