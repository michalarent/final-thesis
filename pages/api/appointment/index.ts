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
  POST: async ({ user, woundId, requestedDoctor, data }) => {
    console.log("xD DAtA:", data);

    const response = await addAppointment(
      user.authId,
      data["0"].wound,
      data["0"].requestedDoctor,
      data
    );
    console.log(response);
    return response;
  },
});
