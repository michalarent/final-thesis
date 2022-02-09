import apiEndpoint from "../../../../common/api";
import { addImageToWoundImages } from "../../../../services/ImageServices";

export default apiEndpoint({
  POST: async ({ woundId, imageUrl }) => {
    const response = await addImageToWoundImages(woundId, imageUrl);
    return response;
  },
});
