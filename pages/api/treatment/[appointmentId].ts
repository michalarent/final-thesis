import apiEndpoint from "../../../common/api";
import failwith from "../../../common/util/failwith";
import { isDoctor } from "../../../services/DoctorServices";
import { addExaminationAnswer } from "../../../services/ExaminationServices";
import { isPatient } from "../../../services/PatientServices";
import { startTreatmentForAppointment } from "../../../services/TreatmentServices";

export default apiEndpoint({
  POST: async ({ appointmentId }, { user }) => {
    const _isDoctor = await isDoctor(user.authId);
    if (_isDoctor) {
      const response = await startTreatmentForAppointment(appointmentId);
      return response;
    } else {
      failwith(`NOT A PATIENT`);
    }
  },
});
