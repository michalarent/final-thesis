import _ from "lodash";
import { getOrm } from "../db";
import { Chat } from "../db/Chat";
import { ChatMessage } from "../db/ChatMessage";
import User from "../db/User";

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

export async function getAllChatsAndPeople(authId: string) {
  const orm = await getOrm();

  const chats_1 = await orm.em
    .createQueryBuilder(Chat, "chat")
    .select("chat.*, messages.*")
    .where({ user_1: authId })
    .leftJoinAndSelect("messages", "messages")
    .getResultList();

  const chats_2 = await orm.em
    .createQueryBuilder(Chat, "chat")
    .select("chat.*, messages.*")
    .where({ user_2: authId })
    .leftJoinAndSelect("messages", "messages")
    .getResultList();

  const chats = [...chats_1, ...chats_2];

  const peopleRequests = chats.map(async (chat) => {
    if (chat.user_1 !== authId) {
      return orm.em.findOne(User, { authId: chat.user_1 });
    } else {
      return orm.em.findOne(User, { authId: chat.user_2 });
    }
  });

  const finalChats = _.merge(
    chats,
    _.uniqBy(await Promise.all(peopleRequests), "authId")
  );

  console.log("Final", finalChats);
  return finalChats.map((chat) => ({
    lastMessage: {
      ...chat.messages[chat.messages.length - 1],
    },
    ...chat,
  }));
}
