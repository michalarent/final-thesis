import failwith from "../common/util/failwith";
import { getOrm } from "../db";
import { Appointment } from "../db/Appointment";
import { Doctor } from "../db/Doctor";
import Timeline from "../db/Timeline";
import TimelineEvent from "../db/TimelineEvent";
import { Treatment } from "../db/Treatment";
import TreatmentMedication from "../db/TreatmentMedication";
import { Wound } from "../db/Wound";
import { MedicationType } from "../types/medication";
import { getMedication } from "./MedicationServices";
import { getMedicalHistory } from "./PatientServices";
import { getCurrentUser, getUser } from "./UserServices";
import { getAppointmentsForWound } from "./WoundServices";

export async function getTreatment(id: number) {
  const orm = await getOrm();

  const treatment = await orm.em
    .createQueryBuilder(Treatment, "treatment")
    .select("*")
    .where({ id })
    .leftJoinAndSelect("treatment.wound", "wound")
    .leftJoinAndSelect("wound.patient", "patient")

    .leftJoinAndSelect("wound.woundData", "woundData")
    .leftJoinAndSelect("patient.medicalHistory", "medicalHistory")

    .leftJoinAndSelect("treatment.doctor", "doctor")
    .leftJoinAndSelect("treatment.treatmentMedications", "treatmentMedications")
    .leftJoinAndSelect("treatmentMedications.medication", "medication")
    .getSingleResult();

  if (treatment) {
    const appointments = await getAppointmentsForWound(treatment.wound.id);
    const timelineEvents = await orm.em
      .createQueryBuilder(TimelineEvent, "timelineEvent")
      .select("*")
      .where({ timeline: treatment.timeline })
      .getResultList();

    const medicalHistory = await getMedicalHistory(
      treatment.wound.patient.authId
    );

    return {
      ...treatment,
      wound: {
        ...treatment.wound,
        patient: {
          ...treatment.wound.patient,
          medicalHistory,
        },
      },
      timelineEvents,
      appointments: appointments,
    };
  } else {
    failwith("Treatment with given id not found!");
  }
}

export async function getTreatmentsForWound(woundId: number) {
  const orm = await getOrm();

  const treatments = await orm.em.find(Treatment, {
    wound: { id: woundId },
  });

  return treatments;
}

export async function getTreatmentsForPatient(patientId: number) {
  const orm = await getOrm();

  const treatments = await orm.em.find(Treatment, {
    wound: { patient: { id: patientId } },
  });

  return treatments;
}

export async function addTreatment(
  doctorId: string,
  woundId: number,
  medications: { dosage: number; medication: MedicationType }[]
) {
  const orm = await getOrm();

  console.log(woundId, doctorId);

  const wound = await orm.em.findOne(Wound, {
    id: woundId,
  });

  const doctor = await orm.em.findOne(Doctor, {
    authId: doctorId,
  });

  if (!wound) {
    failwith("Wound not found!");
  }

  try {
    // create new treatment with timeline
    const treatment = new Treatment();
    treatment.wound = wound;
    treatment.doctor = doctor;
    treatment.timeline = new Timeline();
    treatment.createdAt = new Date();

    await orm.em.persistAndFlush(treatment);

    const treatmentMedications = [];

    for (const medication of medications) {
      const _medication = await getMedication(medication.medication.id);
      const _treatmentMedication = orm.em.create(TreatmentMedication, {
        dosage: medication.dosage,
        medication: _medication,
        treatment: treatment,
      });
      treatmentMedications.push(_treatmentMedication);
    }
    await orm.em.persistAndFlush(treatmentMedications);

    return treatment;
  } catch (e) {
    failwith(e);
  }
}

export async function removeTreatment(id: number, authId: string) {
  const orm = await getOrm();

  const treatment = await orm.em.findOne(Treatment, {
    doctor: { authId },
    id,
  });

  if (!treatment) {
    failwith("Treatment not found!");
  }

  try {
    const treatmentMedications = await orm.em.find(TreatmentMedication, {
      treatment: { id },
    });
    await orm.em.removeAndFlush(treatmentMedications);
    await orm.em.removeAndFlush(treatment);
    return treatment;
  } catch (e) {
    failwith(e);
  }
}

export async function updateTreatment(id: number, treatment: Treatment) {
  const orm = await getOrm();

  const treatmentToUpdate = await orm.em.findOne(Treatment, {
    id,
  });

  if (!treatmentToUpdate) {
    failwith("Treatment not found!");
  }

  try {
    await orm.em.persistAndFlush(treatment);
    return treatment;
  } catch (e) {
    failwith(e);
  }
}

export async function addMedicationToTreatment(
  treatmentId: number,
  medicationId: number
) {
  const orm = await getOrm();

  const treatment = await orm.em.findOne(Treatment, {
    id: treatmentId,
  });

  if (!treatment) {
    failwith("Treatment not found!");
  }

  const medication = await orm.em.findOne(TreatmentMedication, {
    id: medicationId,
  });

  if (!medication) {
    failwith("Medication not found!");
  }

  try {
    await orm.em.persistAndFlush(medication);
    return medication;
  } catch (e) {
    failwith(e);
  }
}

export async function startTreatmentForAppointment(appointmentId: number) {
  const orm = await getOrm();

  const appointment = await orm.em.findOne(Appointment, {
    id: appointmentId,
  });

  if (!appointment) {
    failwith("Appointment not found!");
  }

  const treatment = await orm.em.findOne(Treatment, {
    wound: { id: appointment.wound.id },
  });

  if (!treatment) {
    const treatment = new Treatment();
    treatment.wound = appointment.wound;
    treatment.doctor = appointment.doctor;
    treatment.timeline = new Timeline();
    treatment.createdAt = new Date();

    try {
      await orm.em.persistAndFlush(treatment);
      return treatment;
    } catch (e) {
      failwith(e);
    }
  }
}

export async function getTreatmentForAppointment(appointmentId: number) {
  const orm = await getOrm();

  const appointment = await orm.em.findOne(Appointment, {
    id: appointmentId,
  });

  if (!appointment) {
    failwith("Appointment not found!");
  }

  const treatment = await orm.em.findOne(Treatment, {
    wound: { id: appointment.wound.id },
  });

  return treatment;
}
