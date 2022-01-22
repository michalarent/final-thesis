import failwith from "../common/util/failwith";
import { getOrm } from "../db";
import Medication from "../db/Medication";
import TreatmentMedication from "../db/TreatmentMedication";
import { MedicationType } from "../types/medication";

export async function createMedication(data: Medication) {
  const orm = await getOrm();
  console.log(data);

  try {
    const medication = await orm.em.create(Medication, data);
    await orm.em.persistAndFlush(medication);
    return medication;
  } catch (e) {
    failwith("Medication could not be created!");
  }
}

export async function deleteMedication(id: number) {
  const orm = await getOrm();

  try {
    const medication = await orm.em.findOne(Medication, {
      id,
    });

    if (!medication) {
      failwith("Medication not found!");
    }

    await orm.em.removeAndFlush(medication);
  } catch (e) {
    failwith("Medication could not be deleted!");
  }
}

export async function getMedication(id: number) {
  const orm = await getOrm();

  try {
    const medication = await orm.em.findOne(Medication, {
      id,
    });

    if (!medication) {
      failwith("Medication not found!");
    }

    return medication;
  } catch (e) {
    failwith("Medication could not be found!");
  }
}

export async function updateMedication(medication: MedicationType) {
  const orm = await getOrm();

  try {
    const medicationToUpdate = await orm.em.findOne(Medication, {
      id: medication.id,
    });

    if (!medicationToUpdate) {
      failwith("Medication not found!");
    }
    medicationToUpdate.name = medication.name;
    medicationToUpdate.description = medication.description;
    medicationToUpdate.type = medication.type;
    await orm.em.persistAndFlush(medicationToUpdate);
    return medication;
  } catch (e) {
    failwith("Medication could not be updated!");
  }
}

export async function getAllMedications(): Promise<MedicationType[]> {
  const orm = await getOrm();

  try {
    const medications = await orm.em.find(Medication, {});

    return medications as MedicationType[];
  } catch (e) {
    failwith("Medications could not be found!");
  }
}

export async function getMedicationsByTreatmentId(id: number) {
  const orm = await getOrm();

  try {
    const treatmentMedications = await orm.em.find(TreatmentMedication, {
      treatment: { id },
    });

    console.log(treatmentMedications);

    return treatmentMedications;
  } catch (e) {
    failwith(e);
  }
}
