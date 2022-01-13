import apiEndpoint, {
  addImageToAppointmentImages,
} from "../../../../common/api";

export default apiEndpoint({
  POST: async (appointmendId, imageUrl) => {
    const response = await addImageToAppointmentImages({
      appointmendId,
      data: imageUrl,
    });

    return response;
  },
});
