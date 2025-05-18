export interface ChatHistoryProps {
  chatHistory: Message[];
}

export interface Message {
  timeStamp: number;
  data: string;
}