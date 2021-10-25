import { Collection, Entity, OneToMany } from "@mikro-orm/core";
import { Appointment } from "./Appointment";
import User from "./User";

@Entity()
export class Doctor extends User {
  @OneToMany(() => Appointment, (app) => app.doctor)
  appointments = new Collection<Appointment>(this);
}
