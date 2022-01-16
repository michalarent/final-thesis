import apiEndpoint, {
  addAnnotationsToImage,
  addImageToAppointmentImages,
  getAnnotations,
  removeAnnotationsFromImage,
} from "../../../../common/api";

export default apiEndpoint({
  POST: async ({ imageId, annotations }) => {
    console.log("addAnnotationsToImage", imageId, annotations);
    const response = await addAnnotationsToImage(imageId, annotations);

    return response;
  },
  DELETE: async ({ imageId }) => {
    const response = await removeAnnotationsFromImage(imageId);

    return response;
  },
  GET: async ({ imageId }) => {
    const response = await getAnnotations(imageId);

    return response;
  },
});
