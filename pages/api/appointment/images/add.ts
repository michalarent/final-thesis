import apiEndpoint, {
  addImageToAppointmentImages,
} from "../../../../common/api";

export default apiEndpoint({
  POST: async ({ appointmentId, imageUrl }) => {
    const response = await addImageToAppointmentImages(appointmentId, imageUrl);

    return response;
  },
});
