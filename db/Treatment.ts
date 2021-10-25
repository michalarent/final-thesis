import {
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Appointment } from "./Appointment";

@Entity()
export class Treatment {
  @PrimaryKey()
  id: number;

  @ManyToMany({ entity: () => Appointment })
  appointments: Appointment | any;

  @Property({ type: "jsonb" })
  data: Record<string, any>;
}
