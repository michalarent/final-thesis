import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import ExaminationFormAnswer from "./ExaminationFormAnswer";

import { Treatment } from "./Treatment";

@Entity()
export default class ScheduledExaminationForm {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property({ type: "date" })
  date: Date = new Date();

  @Property({ type: "string" })
  status: "completed" | "pending" = "pending";

  @ManyToOne({ entity: () => Treatment, nullable: true })
  treatment!: Treatment | any;

  @Property({ type: "jsonb" })
  formData: Record<string, any> = {};

  @OneToOne({
    entity: () => ExaminationFormAnswer,
    orphanRemoval: true,
    nullable: true,
  })
  examinationFormAnswer?: ExaminationFormAnswer | any;
}
