import apiEndpoint, { getAppointment } from "../../../common/api";
import {
  getAllChatsAndPeople,
  getChatMessages,
  sendMessage,
} from "../../../services/ChatServices";

export default apiEndpoint({
  GET: async ({ sender }) => {
    const response = await getAllChatsAndPeople(sender);
    return response;
  },
});
