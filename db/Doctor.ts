import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { Appointment } from "./Appointment";
import { Chat } from "./Chat";
import { Treatment } from "./Treatment";

import User from "./User";

type NewType = Chat;

@Entity()
export class Doctor extends User {
  @OneToMany(
    () => Appointment,
    (app) => app.doctor
  )
  appointments = new Collection<Appointment>(this);

  @Property({ type: "jsonb" })
  doctorData: Record<string, any> = {};

  @OneToMany({ entity: () => Chat, mappedBy: "doctor" })
  chats = new Collection<Chat>(this);

  @OneToMany({ entity: () => Treatment, mappedBy: "doctor" })
  treatments = new Collection<Treatment>(this);
}
