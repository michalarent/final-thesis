import failwith from "../common/util/failwith";
import { getOrm } from "../db";
import Medication from "../db/Medication";
import TreatmentMedication from "../db/TreatmentMedication";

export async function UpdateTreatmentMedication(
  treatmentId: number,
  data: { dosage: number; instructions: string }
) {
  const orm = await getOrm();

  const treatmentMedication = await orm.em.findOne(TreatmentMedication, {
    treatment: { id: treatmentId },
  });

  if (!treatmentMedication) {
    failwith("TreatmentMedication not found!");
  }

  try {
    treatmentMedication.instructions = data.instructions;
    treatmentMedication.dosage = data.dosage.toString();

    await orm.em.persistAndFlush(treatmentMedication);
    return treatmentMedication;
  } catch (e) {
    failwith(e);
  }
}

export async function AddTreatmentMedication(
  treatmentId: number,
  data: { medication: string; dosage: number; instructions: string }
) {
  const orm = await getOrm();

  console.log(data);

  const treatmentMedication = await orm.em.findOne(TreatmentMedication, {
    treatment: { id: treatmentId },
  });

  if (!treatmentMedication) {
    failwith("TreatmentMedication not found!");
  }

  try {
    const _medication = await orm.em.findOne(Medication, {
      id: +data.medication,
    });

    const _treatmentMedication = orm.em.create(TreatmentMedication, {
      dosage: data.dosage.toString(),
      instructions: data.instructions,
      medication: _medication,
      treatment: treatmentMedication.treatment,
    });

    await orm.em.persistAndFlush(_treatmentMedication);
    return _treatmentMedication;
  } catch (e) {
    failwith(e);
  }
}

export async function RemoveTreatmentMedication(
  treatmentId: number,
  data: { medication: number }
) {
  const orm = await getOrm();

  console.log(data);

  const treatmentMedication = await orm.em.findOne(TreatmentMedication, {
    id: data.medication,
  });

  if (!treatmentMedication) {
    failwith("TreatmentMedication not found!");
  }

  try {
    await orm.em.removeAndFlush(treatmentMedication);
    return treatmentMedication;
  } catch (e) {
    failwith(e);
  }
}
