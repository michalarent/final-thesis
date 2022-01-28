import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { FormInput } from "../data/types";
import { Doctor } from "./Doctor";

@Entity()
export default class ExaminationFormTemplate {
  @PrimaryKey()
  id!: number;

  @Property()
  title: string;

  @Property({ default: "" })
  description: string;

  @Property({ type: "date" })
  createdAt: Date;

  @Property({ type: "jsonb" })
  inputs: FormInput[];

  @ManyToOne({ entity: () => Doctor }, { nullable: true })
  doctor: Doctor | any;
}
