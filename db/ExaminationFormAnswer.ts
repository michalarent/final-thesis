import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import ScheduledExaminationForm from "./ScheduledExaminationForm";

@Entity()
export default class ExaminationFormAnswer {
  @PrimaryKey()
  id!: number;

  @OneToOne(
    { entity: () => ScheduledExaminationForm, nullable: true },
    (form) => form.examinationFormAnswer
  )
  scheduledExaminationForm?: ScheduledExaminationForm | any;

  @Property({ type: "jsonb" })
  formData: Record<string, any> = {};
}
