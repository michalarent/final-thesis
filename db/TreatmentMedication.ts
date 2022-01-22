import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import Medication from "./Medication";
import Prescription from "./Prescription";
import { Treatment } from "./Treatment";

@Entity()
export default class TreatmentMedication {
  @PrimaryKey()
  id: number;

  @Property()
  dosage: string;

  @ManyToOne({ entity: () => Treatment }, { nullable: true })
  treatment: Treatment | any;

  @ManyToOne({ entity: () => Medication }, { nullable: true })
  medication: Medication | any;

  @Property({ nullable: true })
  instructions: string;

  @OneToOne({
    inversedBy: "treatmentMedication",
    orphanRemoval: true,
    nullable: true,
  })
  prescription: Prescription;
}
