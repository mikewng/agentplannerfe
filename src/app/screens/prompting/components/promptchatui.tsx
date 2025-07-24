import React, { useEffect, useRef } from "react";
import { useChat, Message } from "@ai-sdk/react";
import { sendMessageToGPT } from "@/app/util/llmapi";
import "./promptchatui.scss"

export default function ChatUI() {
    const { messages, setMessages, input, setInput, handleInputChange } = useChat({
        // api: "/api/chat", // Points to your backend endpoint
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const aiMessage: Message = {
            id: String(Date.now() + 1),
            role: "system",
            content: "Hello! What's on your mind?",
        };

        setMessages([...messages, aiMessage])
    }, [])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);


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

        const reply = await sendMessageToGPT(newMessages);

        const aiMessage: Message = {
            id: String(Date.now() + 1),
            role: "system",
            content: reply,
        };

        setMessages([...newMessages, aiMessage]);
    }

    return (
        <div className="prompt-chat-ui-container">
            <div className="prompt-chat-ui-box-container" ref={scrollRef}>
                {messages.map((m, i) => (
                    <div className={"prompt-message-container " + m.role} key={i}>
                        <div className="prompt-message-content">
                            <div className="prompt-author-text">{m.role === "user" ? "You" : "EVA"}</div>
                            <div className={"prompt-message-text" + (m.role === "system" ? " typewriter-text" : "")}>{m.content || ""}</div>
                        </div>
                    </div>
                ))}
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
        </div >
    );
}
