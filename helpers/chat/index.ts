import apiCall from "../../common/api/ApiCall";
import { getOrm } from "../../db";
import User from "../../db/User";
import { getChatMessages } from "../../services/ChatServices";

export async function getLastMessagesAndPeople(
  sender_auth_id: string,
  users: User[]
) {
  const requests = users.map(async (user) => {
    const response = await apiCall(
      `/api/chat/all?sender=${sender_auth_id}`,
      "GET"
    );
    return response;
  });
  const responses = await Promise.all(requests);

  return responses;
}
