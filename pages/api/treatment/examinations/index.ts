import apiEndpoint from "../../../../common/api";
import failwith from "../../../../common/util/failwith";
import { isDoctor } from "../../../../services/DoctorServices";
import {
  getScheduledExaminationsByTreatmentId,
  removeScheduledExamination,
  scheduleExamination,
  updateScheduledExamination,
} from "../../../../services/ExaminationServices";

export default apiEndpoint({
  GET: async ({ treatmentId }, { user }) => {
    const response = await getScheduledExaminationsByTreatmentId(treatmentId);
    return response;
  },
  POST: async ({ treatmentId, data, dates, title }, { user }) => {
    const _isDoctor = await isDoctor(user.authId);
    if (_isDoctor) {
      const response = await scheduleExamination(
        treatmentId,
        data,
        dates,
        title
      );
      return response;
    } else {
      failwith(
        `NOT A DOCTOR!\nError @ /api/appointment/images/annotations\naddAnnotationsToImage()\nProps: ${user} `
      );
    }
  },
  DELETE: async ({ examinationId }, { user }) => {
    const _isDoctor = await isDoctor(user.authId);
    if (_isDoctor) {
      const response = await removeScheduledExamination(examinationId);

      return response;
    } else {
      failwith(
        `NOT A DOCTOR!\nError @ /api/appointment/images/annotations\nremoveAnnotationsFromImage()\nProps: ${user} `
      );
    }
  },
  PUT: async ({ examinationId, data, dates }, { user }) => {
    const _isDoctor = await isDoctor(user.authId);
    if (_isDoctor) {
      const response = await updateScheduledExamination(examinationId, data);
      return response;
    } else {
      failwith(
        `NOT A DOCTOR!\nError @ /api/appointment/images/annotations\nremoveAnnotationsFromImage()\nProps: ${user} `
      );
    }
  },
});
