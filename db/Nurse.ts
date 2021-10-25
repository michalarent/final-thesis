import { Collection, Entity, OneToMany } from "@mikro-orm/core";
import { Appointment } from "./Appointment";
import User from "./User";

@Entity()
export class Nurse extends User {
  
  @OneToMany(() => Appointment, (app) => app.nurse)
  appointments = new Collection<Appointment>(this);
}
