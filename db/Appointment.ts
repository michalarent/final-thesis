import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Doctor } from "./Doctor";
import Image from "./Image";

import { Treatment } from "./Treatment";
import { Wound } from "./Wound";

@Entity()
export class Appointment {
  @PrimaryKey()
  public id: number;

  @ManyToOne({ entity: () => Wound }, { nullable: true })
  wound: Wound | any;

  @Property()
  date: Date;

  @Property({ type: "jsonb" })
  info: Record<string, any>;

  @ManyToOne({ entity: () => Doctor })
  doctor: Doctor | any;

  @OneToMany(
    () => Image,
    (img) => img.appointment,
    {
      mappedBy: "appointment",
      orphanRemoval: true,
      nullable: false,

      default: [],
    }
  )
  images = new Collection<Image>(this);
}
