import React, { useEffect, useRef, useState } from "react";
import { useChat, Message } from "@ai-sdk/react";
import { io, Socket } from "socket.io-client";
import { sendMessageToGPT } from "@/app/util/llmapi";
import "./promptchatui.scss";

export default function ChatUI() {
    const { messages, setMessages, input, setInput, handleInputChange } = useChat({});
    const scrollRef = useRef<HTMLDivElement>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const aiMessage: Message = {
            id: String(Date.now() + 1),
            role: "system",
            content: "Hello! What's on your mind?",
        };
        setMessages([...messages, aiMessage]);
    }, [])

    useEffect(() => {
        const s = io("http://localhost:3001");
        setSocket(s);

        s.on("gpt-token", (chunk: string) => {
            setMessages(prev => {
                const updated = [...prev];
                const last = updated[updated.length - 1];

                if (last && last.role === "system") {
                    last.content += chunk;
                } else {
                    updated.push({ id: String(Date.now()), role: "system", content: chunk });
                }

                return [...updated];
            });
        });

        return () => {
            s.disconnect();
        };
    }, [setMessages]);

    // Send user message and tell backend to start streaming
    async function handleSend(e: React.FormEvent) {
        e.preventDefault();

        const userMessage: Message = {
            id: String(Date.now()),
            role: "user",
            content: input,
        };

        const newMessages: Message[] = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");

        if (socket) {
            socket.emit("start-stream", { prompt: input });
        } else {
            const reply = await sendMessageToGPT(newMessages);
            const aiMessage: Message = {
                id: String(Date.now() + 1),
                role: "system",
                content: reply,
            };
            setMessages([...newMessages, aiMessage]);
        }
    }

    // Auto-scroll on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="prompt-chat-ui-container">
            <div className="prompt-chat-ui-box-container" ref={scrollRef}>
                <div className="prompt-box-padding-container">
                    {messages.map((m, i) => (
                        <div className={"prompt-message-container " + m.role} key={i}>
                            <div className="prompt-message-content">
                                <div className="prompt-author-text">
                                    {m.role === "user" ? "You" : "EVA"}
                                </div>
                                <div
                                    className={
                                        "prompt-message-text" +
                                        (m.role === "system" ? " typewriter-text" : "")
                                    }
                                >
                                    {m.content || ""}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <form className="prompt-chat-ui-input-container" onSubmit={handleSend}>
                <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    className="prompt-chat-ui-input-control"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}