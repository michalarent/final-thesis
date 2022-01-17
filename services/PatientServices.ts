import { getOrm } from "../db";
import { Doctor } from "../db/Doctor";
import { uniqBy } from "lodash";

export async function getDoctorsRelatedToPatient(patientId: string) {
  const orm = await getOrm();
  const _all = await orm.em
    .createQueryBuilder(Doctor, "doctor")
    .where({ appointments: { wound: { patient: { authId: patientId } } } })
    .getResultList();

  console.log("Patient's doctors: ", _all);

  return _all;
}
