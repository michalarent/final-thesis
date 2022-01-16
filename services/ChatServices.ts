import { getOrm } from "../db";
import { Chat } from "../db/Chat";
import { ChatMessage } from "../db/ChatMessage";

async function createChat(sender, receiver) {
  const orm = await getOrm();
  const chat = new Chat();
  chat.user_1 = sender;
  chat.user_2 = receiver;
  await orm.em.persistAndFlush(chat);
  return chat;
}

async function getChat(sender, receiver) {
  const orm = await getOrm();
  const [chat, chat_inverse] = await Promise.all([
    orm.em.findOne(Chat, {
      user_1: sender,
      user_2: receiver,
    }),
    orm.em.findOne(Chat, {
      user_1: receiver,
      user_2: sender,
    }),
  ]);
  if (chat) return chat;
  if (chat_inverse) return chat_inverse;
}

export async function getChatMessages(sender, receiver) {
  const orm = await getOrm();
  const chat = await getChat(sender, receiver);
  const messages = await orm.em.find(ChatMessage, {
    chat: chat.id,
  });
  return messages;
}

export async function sendMessage(sender, receiver, message) {
  const orm = await getOrm();
  let chat: Chat;
  chat = await getChat(sender, receiver);
  if (!chat) {
    chat = await createChat(sender, receiver);
  }
  const chatMessage = new ChatMessage();
  chatMessage.text = message;
  chatMessage.user_auth_id = sender;
  chatMessage.createdAt = Date.now().toString();
  chatMessage.chat = chat;
  await orm.em.persistAndFlush(chatMessage);
  return chatMessage;
}
