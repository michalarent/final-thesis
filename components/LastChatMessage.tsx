import Link from "next/link";
import ChatBox, { ReceivedMessage, SentMessage } from "./ChatBox";
import { Avatar } from "./DoctorCard";
import { ArentGrid } from "./ui/navigation/layout/ArentGrid";
import Modal from "react-modal";
import { modalStyles } from "./modal_styles";
import { Container } from "./ui/Container";
import { Button } from "carbon-components-react";
import { useState } from "react";
import { DateTime } from "luxon";
import { getStandardDate } from "../common/util/dates";

export default function LastChatMessage({
  currentUserId,
  chats,
  isPatient,
}: {
  currentUserId: string;
  chats: any[];
  isPatient: boolean;
}) {
  const [openChatModal, setOpenChatModal] = useState(false);

  if (chats == null || !chats.length) {
    return (
      <div>
        <small>Last Message</small>
        <h3>Messages</h3>
        <br />
        <br />
        <br />
        No messages found.
      </div>
    );
  }

  const lastChat = chats
    .sort(
      (a, b) =>
        new Date(+a.lastMessage.createdAt).getTime() -
        new Date(+b.lastMessage.createdAt).getTime()
    )
    .map((chat) => ({
      ...chat,
      lastMessage: {
        ...chat.lastMessage,
        createdAt: getStandardDate(+chat.lastMessage.createdAt),
      },
    }))[0];

  console.log(lastChat);
  const isUser = lastChat.lastMessage.user_auth_id === currentUserId;

  const ChatModal = () => {
    return (
      <Modal
        isOpen={true}
        style={modalStyles}
        onRequestClose={() => {
          setOpenChatModal(false);
        }}
      >
        <Container>
          <>
            {isPatient ? (
              <>
                <h3 style={{ textAlign: "left", marginBottom: "1rem" }}>
                  {lastChat.doctor.name}
                </h3>
                <ChatBox
                  sender={currentUserId}
                  receiver={lastChat.doctor.authId}
                />
              </>
            ) : (
              <>
                {" "}
                <h3 style={{ textAlign: "left", marginBottom: "1rem" }}>
                  {lastChat.patient.name}
                </h3>
                <ChatBox
                  sender={currentUserId}
                  receiver={lastChat.patient.authId}
                />
              </>
            )}
          </>
        </Container>
      </Modal>
    );
  };

  if (isUser) {
    return (
      <div>
        {openChatModal && ChatModal()}
        <small>Last Message</small>
        <h3>Messages</h3>
        <br />
        <br />

        <ArentGrid columns="auto 1fr" width="100%" gap={20} align="end">
          <Avatar
            style={{ width: 50, height: 50 }}
            src="https://thispersondoesnotexist.com/image"
          />
          <div style={{ width: "100%" }}>
            <span style={{ opacity: 0.5, marginBottom: 4 }}>
              Sent by You to{" "}
              <span style={{ color: "blue" }}>
                <Link
                  href={
                    isPatient
                      ? `/doctors/${lastChat.doctor.authId}`
                      : `/dashboard/doctor/patients?highlight=${lastChat.patient.authId}`
                  }
                >
                  <>
                    {isPatient ? lastChat.doctor.name : lastChat.patient.name}
                  </>
                </Link>{" "}
              </span>
              | {lastChat.lastMessage.createdAt}
            </span>
            <SentMessage style={{ marginTop: 4 }}>
              {lastChat.lastMessage.text}
            </SentMessage>
          </div>
        </ArentGrid>
        <br />
        <Button size="small" onClick={() => setOpenChatModal(true)}>
          Open chat
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        {openChatModal && <ChatModal />}
        <small>Last Message</small>
        <h3>Messages</h3>
        <br />
        <br />
        <ArentGrid columns="auto 1fr" width="100%" gap={20} align="end">
          <Avatar
            style={{ width: 50, height: 50 }}
            src="https://thispersondoesnotexist.com/image"
          />
          <div style={{ width: "100%" }}>
            <span style={{ opacity: 0.5, marginBottom: 4 }}>
              <span style={{ color: "blue" }}>
                <Link
                  href={
                    isPatient
                      ? `/doctors/${lastChat.doctor.authId}`
                      : `/patients/${lastChat.patient.authId}`
                  }
                >
                  <>
                    {isPatient ? lastChat.doctor.name : lastChat.patient.name}
                  </>
                </Link>{" "}
              </span>
              | {lastChat.lastMessage.createdAt}
            </span>
            <ReceivedMessage style={{ marginTop: 4 }}>
              {lastChat.lastMessage.text}
            </ReceivedMessage>
          </div>
          <br />
        </ArentGrid>
        <Button size="small" onClick={() => setOpenChatModal(true)}>
          Open chat
        </Button>
      </div>
    );
  }
}
