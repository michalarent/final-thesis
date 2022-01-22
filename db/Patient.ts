import User from "./User";
import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  Property,
} from "@mikro-orm/core";
import PatientMedicalHistory from "./PatientMedicalHistory";

import { Wound } from "./Wound";
import { Chat } from "./Chat";

@Entity()
export default class Patient extends User {
  @Property({ type: "jsonb" })
  medicalFormData: Record<string, any> = {};

  @OneToMany(
    () => Wound,
    (wound) => wound.patient
  )
  wounds = new Collection<Wound>(this);

  @OneToOne({ inversedBy: "patient", orphanRemoval: true, nullable: true })
  medicalHistory: PatientMedicalHistory;

  @OneToMany({ entity: () => Chat, mappedBy: "patient" })
  chats = new Collection<Chat>(this);
}
