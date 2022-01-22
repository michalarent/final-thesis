import apiEndpoint from "../../../common/api";
import { isDoctor } from "../../../services/DoctorServices";
import { isPatient } from "../../../services/PatientServices";

export default apiEndpoint({
  GET: async (_: void, { user }) => {
    //@ts-ignore
    const _isDoctor = await isDoctor(user.authId);
    //@ts-ignore
    const _isPatient = await isPatient(user.authId);

    if (_isDoctor) {
      return {
        user,
        isDoctor: true,
        isPatient: false,
      };
    }
    if (_isPatient) {
      return {
        user,
        isPatient: true,
        isDoctor: false,
      };
    }

    return { user, isPatient: false, isDoctor: false };
  },
});
