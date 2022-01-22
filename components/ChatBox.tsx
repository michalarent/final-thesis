import {
  Tile,
  TextInput,
  Button,
  Loading,
  InlineLoading,
} from "carbon-components-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import apiCall from "../common/api/ApiCall";
import useChat from "../hooks/useChat";
import useLoaderSWR from "../hooks/useLoaderSWR";

import { colors } from "../theme/colors";
import { ArentFlex, ArentGrid } from "./ui/navigation/layout/ArentGrid";

export const SentMessage = styled.div`
  line-height: 24px;
  position: relative;
  padding: 10px 20px;
  border-radius: 25px;
  background: #0b93f6;

  &:before {
    right: -7px;
    width: 20px;
    background-color: #f4f4f4;
    border-bottom-left-radius: 16px 14px;
  }

  &:after {
    right: -26px;
    width: 26px;
    background-color: #f4f4f4;
    border-bottom-left-radius: 10px;
  }
  & p {
    word-wrap: break-word;
    font-weight: normal;
    line-height: 24px;
    position: relative;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    border-radius: 25px;
    color: white;

    &:before,
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
    }
  }
`;

export const ReceivedMessage = styled.div`
  line-height: 24px;
  position: relative;
  padding: 10px 20px;
  border-radius: 25px;
  background: ${colors.border};

  &:before {
    left: -7px;
    width: 20px;
    background-color: var(--receive-bg);
    border-bottom-right-radius: 16px 14px;
  }

  &:after {
    left: -26px;
    width: 26px;
    background-color: var(--page-background);
    border-bottom-right-radius: 10px;
  }
  & p {
    word-wrap: break-word;
    font-weight: normal;
    line-height: 24px;
    position: relative;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    border-radius: 25px;
    color: black;

    &:before,
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
    }
  }
`;

export default function ChatBox({
  height,
  sender,
  receiver,
}: {
  height?: number;
  sender: string;
  receiver: string;
}) {
  const [currentMessage, setCurrentMessage] = useState<string>();
  const { chatMessages, isSending, submitChatMessage } = useChat(
    sender,
    receiver
  );

  const messagesEndRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (document.activeElement === inputRef.current) {
      scrollToBottom();
    }
  }, [chatMessages, isSending]);

  return (
    <>
      <div
        style={{
          width: "100%",
          borderBottom: `1px solid ${colors.border}`,
          display: "flex",

          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        {chatMessages.status === "loading" && <InlineLoading />}
        {chatMessages.status === "error" && <p>Error loading messages</p>}
        {chatMessages &&
          chatMessages.status === "ready" &&
          chatMessages.value.map((message, index) =>
            message.sender ? (
              <ArentGrid columns="1fr 1fr">
                <div />
                <ArentFlex
                  direction="column"
                  gap={4}
                  width="100%"
                  style={{ margin: "10px 0" }}
                >
                  <span style={{ opacity: 0.5 }}>You | {message.time}</span>
                  <SentMessage id={index === 0 && "first-chat-message"}>
                    <p>{message.text}</p>
                  </SentMessage>
                </ArentFlex>
              </ArentGrid>
            ) : (
              <ArentGrid columns="1fr 1fr">
                <ArentFlex
                  direction="column"
                  gap={4}
                  align="flex-end"
                  width="100%"
                  style={{ margin: "10px 0" }}
                >
                  <span style={{ opacity: 0.5 }}>Sender | {message.time}</span>
                  <ReceivedMessage id={index === 0 && "first-chat-message"}>
                    <p>{message.text}</p>
                  </ReceivedMessage>
                </ArentFlex>
                <div />
              </ArentGrid>
            )
          )}

        <form
          onChange={(e: any) => setCurrentMessage(e.target.value)}
          style={{ width: "100%", maxWidth: "100%", height: "100%" }}
        >
          <ArentFlex width="100%" align="start" gap={10}>
            <TextInput
              style={{ height: 50, width: "100%", minWidth: "100%" }}
              id={""}
              labelText={""}
              ref={inputRef}
            />
            <Button
              style={{ height: 50 }}
              onClick={() => {
                submitChatMessage(currentMessage, sender, receiver);
                setCurrentMessage("");
              }}
            >
              {isSending ? <InlineLoading /> : "Send"}
            </Button>
          </ArentFlex>
        </form>
      </div>
    </>
  );
}
