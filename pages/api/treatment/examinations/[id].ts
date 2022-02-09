import apiEndpoint from "../../../../common/api";
import failwith from "../../../../common/util/failwith";
import { isDoctor } from "../../../../services/DoctorServices";
import {
  addExaminationAnswer,
  getExaminationAnswerByExaminationId,
  getScheduledExaminationsByTreatmentId,
  removeScheduledExamination,
  scheduleExamination,
  updateScheduledExamination,
} from "../../../../services/ExaminationServices";
import { isPatient } from "../../../../services/PatientServices";

export default apiEndpoint({
  GET: async ({ id }, { user }) => {
    const response = await getExaminationAnswerByExaminationId(id);
    return response;
  },
  POST: async ({ id, data }, { user }) => {
    const _isPatient = await isPatient(user.authId);
    if (_isPatient) {
      console.log(data);
      const response = await addExaminationAnswer(id, data);
      return response;
    } else {
      failwith(`NOT A PATIENT`);
    }
  },
});
