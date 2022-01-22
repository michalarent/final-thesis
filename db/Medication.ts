import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import TreatmentMedication from "./TreatmentMedication";

@Entity()
export default class Medication {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property()
  type: "Ointment" | "Tablet" | "Capsule" | "Syrup" | "Inhaler" | "Herbal";

  @OneToMany({ entity: () => TreatmentMedication, mappedBy: "medication" })
  treatmentMedications: TreatmentMedication[];
}
