import React, { useEffect, useState } from "react";
import { connect, sendMsg } from "../../api";
import { Message } from "../../models/message";
import ChatHistory from "./ChatHistory/ChatHistory";
import ChatInput from "./ChatInput/ChatInput";

interface ChatRoomState {
    chatHistory: any[];
  }

export const ChatRoom: React.FC = () => {

  const [state, setState] = useState<ChatRoomState>({
    chatHistory: [],
  });

  //componentDidMount
  useEffect(() => {
    connect((msg: Message) => {
      console.log("New message: " + msg);
      setState((prevState) => ({
        ...prevState,
        chatHistory: [...prevState.chatHistory, msg],
      }));
      console.log(state);
    });
  });

  const send = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMsg(event.currentTarget.value);
      event.currentTarget.value = "";
    }
  };

  return (
    <div>
        <ChatHistory chatHistory={state.chatHistory}></ChatHistory>
        <ChatInput send={send}/>
    </div>
  );
};
