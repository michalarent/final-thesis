import apiEndpoint from "../../../common/api";
import { isDoctor } from "../../../services/DoctorServices";
import { isPatient } from "../../../services/PatientServices";

export default apiEndpoint({
  GET: async (_: void, { user }) => {
    const [_isDoctor, _isPatient] = await Promise.all([
      //@ts-ignore
      isDoctor(user.authId),
      //@ts-ignore
      isPatient(user.authId),
    ]);

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
