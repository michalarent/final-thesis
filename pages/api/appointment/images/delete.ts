import apiEndpoint from "../../../../common/api";
import { removeImageFromAppointmentImages } from "../../../../services/ImageServices";

export default apiEndpoint({
  DELETE: async (appointmendId, imageUrl) => {
    const response = await removeImageFromAppointmentImages(
      appointmendId,
      imageUrl
    );

    return response;
  },
});
