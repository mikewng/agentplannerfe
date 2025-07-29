import React, { useEffect, useRef, useState } from "react";
import { useChat, Message } from "@ai-sdk/react";
import { io, Socket } from "socket.io-client";
import "./promptchatui.scss";

export default function ChatUI() {
    const { messages, setMessages, input, setInput, handleInputChange } = useChat({});
    const scrollRef = useRef<HTMLDivElement>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isAgentLoading, setIsAgentLoading] = useState(false);

    useEffect(() => {
        const aiMessage: Message = {
            id: String(Date.now() + 1),
            role: "system",
            content: "Hello! What's on your mind?",
            createdAt: new Date(Date.now())
        };
        setMessages([...messages, aiMessage]);
    }, [])

    useEffect(() => {
        const s = io("http://localhost:3001");
        setSocket(s);

        s.on("gpt-token", (chunk: string) => {
            if (chunk === "[END STREAM]") {
                setIsAgentLoading(false)
                return;
            }

            setIsAgentLoading(true)

            setMessages((prev) => {
                if (prev.length === 0) {
                    return [
                        {
                            id: String(Date.now()),
                            role: "system",
                            content: chunk,
                            createdAt: new Date(),
                        },
                    ];
                }

                const last = prev[prev.length - 1];

                // If last is a system message, replace it with a *new* object
                if (last && last.role === "system") {
                    const updatedLast = {
                        ...last,
                        content: last.content + chunk,
                    };

                    return [...prev.slice(0, -1), updatedLast];
                }

                // Otherwise, append a new system message
                return [
                    ...prev,
                    {
                        id: String(Date.now()),
                        role: "system",
                        content: chunk,
                        createdAt: new Date(),
                    },
                ];
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
            createdAt: new Date(Date.now())
        };

        const contextMessage: Message = {
            id: String(Date.now()),
            role: "user",
            content: input + " - Treat all messages before this as context, and use that context to conduct actions for this input. Do not do any double bookings.",
            createdAt: new Date(Date.now())
        };

        const newMessages: Message[] = [...messages, userMessage];
        const contextMessages: Message[] = [...messages, contextMessage];
        setMessages(newMessages);
        setInput("");

        if (socket) {
            setIsAgentLoading(true);
            socket.emit("start-stream", { prompt: contextMessages });
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
                                <div className={"prompt-message-text" + (m.role === "system" ? " typewriter-text" : "")}>
                                    <div className="msg-content">{m.content || ""}</div>
                                    <div className="msg-date">
                                        {m.createdAt ? new Date(m.createdAt).toLocaleTimeString('en-US', {
                                            timeZone: 'America/New_York',
                                            hour: 'numeric',
                                            minute: '2-digit',
                                            hour12: true
                                        }) : ""}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="prompt-chat-ui-input-container">
                {
                    isAgentLoading &&
                    <div className="loading-container">
                        <div className="loading-text">
                            EVA is writing their response...
                        </div>
                    </div>
                }
                <form className="prompt-chat-ui-input-form-container" onSubmit={handleSend}>
                    <input
                        id="prompt-input"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                        className="prompt-chat-ui-input-control"
                    />
                    <button className="send-button" type="submit"><div className="send-icon" /></button>
                </form>
            </div>
        </div>
    );
}