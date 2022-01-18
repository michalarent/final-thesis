import { useState } from "react";
import apiCall from "../common/api/ApiCall";

import useLoaderSWR from "./useLoaderSWR";

const handleWhoIsWho = (messages, sender, receiver) => {
  const mappedMessages = messages.map((message) => {
    if (message.user_auth_id === sender) {
      return {
        ...message,
        sender: true,
        time: new Date(+message.createdAt).toLocaleTimeString(),
      };
    } else {
      return {
        ...message,
        sender: false,
        time: new Date(+message.createdAt).toLocaleTimeString(),
      };
    }
  });

  return mappedMessages;
};

async function getChatMessages(sender, receiver) {
  const captureGroups = sender.match(/sender=(.*)&receiver=(.*)/);
  const response = await apiCall(
    `/api/chat?sender=${captureGroups[1]}&receiver=${captureGroups[2]}`,
    "GET"
  );
  const _messages = handleWhoIsWho(
    response,
    captureGroups[1],
    captureGroups[2]
  );
  return _messages;
}

export default function useChat(sender, receiver) {
  const [counter, setCounter] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const chatMessages = useLoaderSWR(
    `/api/chat?sender=${sender}&receiver=${receiver}&counter=${counter}`,
    getChatMessages
  );

  async function submitChatMessage(message, sender, receiver) {
    try {
      setIsSending(true);
      const response = await apiCall("/api/chat", "POST", {
        message,
        sender,
        receiver,
      });
      return response;
    } catch (e) {
      return new Error(e);
    } finally {
      setIsSending(false);
      setCounter(counter + 1);
    }
  }

  return { chatMessages, submitChatMessage, isSending };
}
