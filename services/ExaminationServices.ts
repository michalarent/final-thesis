import failwith from "../common/util/failwith";
import { getOrm } from "../db";
import ExaminationFormAnswer from "../db/ExaminationFormAnswer";
import ScheduledExaminationForm from "../db/ScheduledExaminationForm";
import TimelineEvent from "../db/TimelineEvent";
import { Treatment } from "../db/Treatment";

export async function scheduleExamination(
  treatmentId: number,
  data: any,
  dates: Date[],
  title: string
) {
  const orm = await getOrm();
  const treatment = await orm.em.findOne(Treatment, {
    id: treatmentId,
  });
  if (!treatment) {
    failwith("Treatment not found!");
  }

  const examinations = dates.map((date) => {
    const newExamination = orm.em.create(ScheduledExaminationForm, {
      date,
      formData: data,
      treatment,
      title,
    });
    return newExamination;
  });

  await orm.em.persistAndFlush(examinations);

  return examinations;
}

export async function getScheduledExaminationsByTreatmentId(
  treatmentId: number
) {
  const orm = await getOrm();
  const treatment = await orm.em.findOne(Treatment, {
    id: treatmentId,
  });
  if (!treatment) {
    failwith("Treatment not found!");
  }

  const examinations = await orm.em
    .createQueryBuilder(ScheduledExaminationForm, "examination")
    .select("*")
    .where({ treatment })
    .getResultList();

  return examinations;
}

export async function removeScheduledExamination(examinationId: number) {
  const orm = await getOrm();
  const examination = await orm.em.findOne(ScheduledExaminationForm, {
    id: examinationId,
  });
  if (!examination) {
    failwith("Examination not found!");
  }

  if (examination.examinationFormAnswer) {
    const answer = await orm.em.findOne(ExaminationFormAnswer, {
      id: examination.examinationFormAnswer.id,
    });
    await orm.em.remove(answer);
  }

  await orm.em.remove(examination);
  await orm.em.flush();

  return examination;
}

export async function updateScheduledExamination(
  examinationId: number,
  date: any
) {
  const orm = await getOrm();
  const examination = await orm.em.findOne(ScheduledExaminationForm, {
    id: examinationId,
  });
  if (!examination) {
    failwith("Examination not found!");
  }
}

export async function markExaminationAsComplete(examinationId: number) {
  const orm = await getOrm();
  const examination = await orm.em.findOne(ScheduledExaminationForm, {
    id: examinationId,
  });
  if (!examination) {
    failwith("Examination not found!");
  }
  examination.status = "completed";
  await orm.em.persistAndFlush(examination);
  return examination;
}

export async function addExaminationAnswer(
  examinationId: number,
  answerData: any
) {
  console.log(answerData);
  const orm = await getOrm();
  const examination = await orm.em.findOne(ScheduledExaminationForm, {
    id: examinationId,
  });
  if (!examination) {
    failwith("Examination not found!");
  }

  const examinationAnswer = orm.em.create(ExaminationFormAnswer, {
    formData: answerData,

    scheduledExaminationForm: examination,
  });

  examination.status = "completed";
  await orm.em.persistAndFlush(examination);
  await orm.em.persistAndFlush(examinationAnswer);

  return examinationAnswer;
}

export async function getExaminationAnswerByExaminationId(
  examinationId: number
) {
  const orm = await getOrm();
  const examination = await orm.em.findOne(ScheduledExaminationForm, {
    id: examinationId,
  });
  if (!examination) {
    failwith("Examination not found!");
  }

  const examinationAnswer = await orm.em.findOne(ExaminationFormAnswer, {
    scheduledExaminationForm: examination,
  });
  if (!examinationAnswer) {
    failwith("Examination answer not found!");
  }

  return examinationAnswer;
}
