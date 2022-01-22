import apiEndpoint from "../../../../common/api";
import failwith from "../../../../common/util/failwith";
import { isDoctor } from "../../../../services/DoctorServices";

import { addTimelineEvent } from "../../../../services/TimelineServices";

export default apiEndpoint({
  POST: async ({ treatmentId, event }, { user }) => {
    const _isDoctor = await isDoctor(user.authId);

    if (_isDoctor) {
      const response = await addTimelineEvent(treatmentId, event);
      return response;
    } else {
      failwith("You are not a doctor");
    }
  },
});
