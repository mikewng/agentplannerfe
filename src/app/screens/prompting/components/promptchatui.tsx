import React, { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";

export default function ChatUI() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "/api/chat", // Points to your backend endpoint
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to newest message
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div style={{ maxWidth: "100rem", margin: "0 auto", padding: "20px" }}>
            <div
                ref={scrollRef}
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "400px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: "10px",
                    width: '25rem'
                }}
            >
                {messages.map((m, i) => (
                    <div className="message" key={i}>{m.content || ""}</div>
                ))}
            </div>
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
                <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    style={{
                        flex: 1,
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
