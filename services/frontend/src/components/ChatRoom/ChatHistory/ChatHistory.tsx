// ChatHistory.tsx
import React, { FC } from 'react';
import './ChatHistory.scss';
import Message from '../Message/Message';
import { ChatHistoryProps } from '../../../models/message';


const ChatHistory: React.FC<ChatHistoryProps> = ({ chatHistory }) => {
  return (
    <div className='ChatHistory'>
      <h2>Chat History</h2>
      <div>{chatHistory.map(({ timeStamp, data }, index) => {
        const { Body } = JSON.parse(data);
        console.log("test");
        console.log(data);
        return <Message message={Body}></Message>})}
      </div>
    </div>
  );
};

export default ChatHistory;