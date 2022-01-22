import {
  Collection,
  Entity,
  IdentifiedReference,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Allergy, BloodType, Medication } from "../data/types";
import Patient from "./Patient";

@Entity()
export default class PatientMedicalHistory {
  @PrimaryKey()
  id!: number;

  @OneToOne({ entity: () => Patient }, (user) => user.medicalHistory)
  patient!: Patient | any;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  birthDate: Date;

  @Property()
  country: string;

  @Property()
  gender: "Male" | "Female" | "Other";

  @Property({ default: [], nullable: true })
  allergies: Allergy[];

  @Property({ nullable: true })
  bloodType: BloodType;

  @Property({ default: [], nullable: true })
  medications: Medication[];

  @Property({ default: false })
  isSmoker: boolean;

  @Property({ default: false })
  isAlcoholic: boolean;

  @Property({ default: false })
  isDiabetic: boolean;
}
