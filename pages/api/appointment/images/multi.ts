import apiEndpoint from "../../../../common/api";
import {
  addImageToWoundImages,
  addManyImages,
  getImagesForTreatment,
} from "../../../../services/ImageServices";

export default apiEndpoint({
  GET: async ({ treatmentId }) => {
    const response = await getImagesForTreatment(treatmentId);
    return response;
  },
  POST: async ({ woundId, images }) => {
    const response = await addManyImages(woundId, images);
    return response;
  },
});
