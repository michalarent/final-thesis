import failwith from "../common/util/failwith";
import { getOrm } from "../db";
import Timeline from "../db/Timeline";
import TimelineEvent from "../db/TimelineEvent";
import { Treatment } from "../db/Treatment";

export async function addTimelineEvent(treatmentId: number, event: any) {
  const orm = await getOrm();

  console.log(event);

  const treatment = await orm.em.findOne(Treatment, {
    id: treatmentId,
  });

  const { timeline } = await orm.em
    .createQueryBuilder(Treatment, "timeline")
    .where({ id: treatmentId })
    .getSingleResult();

  if (!timeline) {
    failwith("Timeline not found!");
  }

  console.log(event);

  const newEvent = orm.em.create(TimelineEvent, {
    comments: event.comment,
    date: event.date,
    name: event.name,
    type: event.type,
    timeline,
  });

  await orm.em.persistAndFlush(newEvent);

  if (!treatment) {
    failwith("Treatment not found!");
  }
}
