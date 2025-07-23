import axios from "axios";
import { Message } from "@ai-sdk/react";

export async function sendMessageToGPT(messages: Message[]): Promise<string> {
  const lastMessage = messages[messages.length - 1]?.content || "";

  const response = await axios.post("/mock-gpt-endpoint", { messages });

  // If you don't have a backend, just return a fake reply:
  return response.data?.message || `Echo: ${lastMessage}`;
}
