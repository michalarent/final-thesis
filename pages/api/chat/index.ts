import apiEndpoint, { getAppointment } from "../../../common/api";
import { getChatMessages, sendMessage } from "../../../services/ChatServices";

export default apiEndpoint({
  GET: async ({ sender, receiver }) => {
    const response = await getChatMessages(sender, receiver);
    return response;
  },
  POST: async ({ sender, receiver, message }) => {
    const response = await sendMessage(sender, receiver, message);
    return response;
  },
});
