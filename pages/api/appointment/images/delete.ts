import apiEndpoint, {
  addImageToAppointmentImages,
  removeImageFromAppointmentImages,
} from "../../../../common/api";

export default apiEndpoint({
  DELETE: async (appointmendId, imageUrl) => {
    const response = await removeImageFromAppointmentImages(
      appointmendId,
      imageUrl
    );

    return response;
  },
});
