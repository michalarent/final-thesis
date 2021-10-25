import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import User from "./User";
import { Wound } from "./Wound";

@Entity()
export default class Patient extends User {
  @Property({ type: "jsonb" })
  medicalFormData: Record<string, any> = {};

  @OneToMany(() => Wound, (wound) => wound.patient)
  wounds = new Collection<Wound>(this);
}
