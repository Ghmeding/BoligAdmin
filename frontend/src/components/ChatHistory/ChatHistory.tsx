import React, { FC } from 'react';
import './ChatHistory.scss';
import Message from '../Message/Message';

interface ChatHistoryProps {
  chatHistory: Message[];
}

interface Message {
  timeStamp: number;
  data: string;
}

const ChatHistory: FC<ChatHistoryProps> = ({ chatHistory }) => {
  const renderMessages = () => {
    return chatHistory.map(({ timeStamp, data }, index) => {
      const { Body } = JSON.parse(data);
      return <p key={timeStamp}>{Body}</p>;
    });
  };

  return (
    <div className='ChatHistory'>
      <h2>Chat History</h2>
      <div>{renderMessages()}</div>
    </div>
  );
};

export default ChatHistory;