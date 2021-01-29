export interface ChatMessage {
  id: number;
  senderId: number;
  recipientId: number;
  message: string;
  createdAt: string;
}
