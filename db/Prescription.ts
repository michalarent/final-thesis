import {
  Entity,
  IdentifiedReference,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import TreatmentMedication from "./TreatmentMedication";

@Entity()
export default class Prescription {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @OneToOne({ entity: () => TreatmentMedication }, (el) => el.prescription, {
    wrappedReference: true,
  })
  treatmentMedication: IdentifiedReference<TreatmentMedication>;
}
