import apiEndpoint from "../../../../common/api";
import { addImageToAppointmentImages } from "../../../../services/ImageServices";

export default apiEndpoint({
  POST: async ({ appointmentId, imageUrl }) => {
    const response = await addImageToAppointmentImages(appointmentId, imageUrl);
    return response;
  },
});
