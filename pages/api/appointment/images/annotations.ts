import apiEndpoint from "../../../../common/api";
import failwith from "../../../../common/util/failwith";
import {
  addAnnotationsToImage,
  removeAnnotationsFromImage,
  getAnnotations,
} from "../../../../services/AnnotationServices";
import { isDoctor } from "../../../../services/DoctorServices";

export default apiEndpoint({
  POST: async ({ imageId, annotations }, { user }) => {
    const _isDoctor = await isDoctor(user.authId);
    if (_isDoctor) {
      const response = await addAnnotationsToImage(imageId, annotations);

      return response;
    } else {
      failwith(
        `NOT A DOCTOR!\nError @ /api/appointment/images/annotations\naddAnnotationsToImage()\nProps: ${user} `
      );
    }
  },
  DELETE: async ({ user, imageId }) => {
    const _isDoctor = await isDoctor(user);
    if (_isDoctor) {
      const response = await removeAnnotationsFromImage(imageId);
      return response;
    } else {
      failwith(
        `NOT A DOCTOR!\nError @ /api/appointment/images/annotations\nremoveAnnotationsFromImage()\nProps: ${user} `
      );
    }
  },
  GET: async ({ imageId }) => {
    const response = await getAnnotations(imageId);

    return response;
  },
});
