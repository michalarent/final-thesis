import apiEndpoint, {
  addAppointment,
  addWound,
  createOrUpdateDoctor,
  getAppointments,
  getDoctor,
  getWounds,
  updateUser,
} from "../../../common/api";

export default apiEndpoint({
  GET: async ({ user }) => {
    const response = await getAppointments(user);
    return response;
  },
  POST: async ({ authId, woundId, requestedDoctor, data }) => {
    const response = await addAppointment(
      authId,
      woundId,
      requestedDoctor,
      data
    );

    return response;
  },
});
