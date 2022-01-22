import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Appointment } from "./Appointment";
import { Doctor } from "./Doctor";
import Timeline from "./Timeline";
import TreatmentMedication from "./TreatmentMedication";
import { Wound } from "./Wound";

@Entity()
export class Treatment {
  @PrimaryKey()
  id: number;

  @ManyToOne({ entity: () => Doctor }, { nullable: true })
  doctor: Doctor | any;

  @ManyToOne({ entity: () => Wound }, { nullable: true })
  wound: Wound | any;

  @OneToMany(
    () => TreatmentMedication,
    (med) => med.treatment,
    {
      nullable: true,
    }
  )
  treatmentMedications = new Collection<TreatmentMedication>(this);

  @Property({ nullable: true, type: "date" })
  createdAt: Date;

  @OneToOne({ inversedBy: "treatment", orphanRemoval: true })
  timeline: Timeline;
}
