import _ from "lodash";
import { getOrm } from "../db";
import { Chat } from "../db/Chat";
import { ChatMessage } from "../db/ChatMessage";
import { Doctor } from "../db/Doctor";
import Patient from "../db/Patient";
import User from "../db/User";
import { isPatient } from "./PatientServices";

async function createChat(sender, receiver) {
  const orm = await getOrm();
  const chat = new Chat();
  chat.user_1 = sender;
  chat.user_2 = receiver;

  let patient = await orm.em.findOne(Patient, { authId: sender });
  if (!patient) {
    patient = await orm.em.findOne(Patient, { authId: receiver });
    chat.patient = patient;
    chat.doctor = await orm.em.findOne(Doctor, { authId: sender });

    await orm.em.persistAndFlush(chat);
    return chat;
  }

  chat.patient = patient;
  chat.doctor = await orm.em.findOne(Doctor, { authId: receiver });
  await orm.em.persistAndFlush(chat);
  return chat;
}

async function getChat(sender, receiver) {
  const orm = await getOrm();

  const _isPatient = await isPatient(sender);
  let chat: Chat;
  if (_isPatient) {
    chat = await orm.em.findOne(Chat, {
      patient: sender,
      doctor: receiver,
    });
  } else {
    chat = await orm.em.findOne(Chat, {
      patient: receiver,
      doctor: sender,
    });
  }
  if (chat) return chat;
}

export async function getChatMessages(sender, receiver) {
  const orm = await getOrm();
  const chat = await getChat(sender, receiver);
  if (chat === undefined) return [];
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
