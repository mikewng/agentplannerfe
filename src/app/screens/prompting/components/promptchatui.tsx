import { useChat } from '@ai-sdk/react'
import "./promptchatui.scss"

const PromptChatUI = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "/api/gpt-chat"
    });

    return (
        <div className="promptchat-ui-container" >
            <div className="promptchat-ui-message-box-container" style={{ minHeight: "300px", border: "1px solid #ccc", padding: "10px" }}>
                {messages.map((m, i) => (
                    <div key={i} style={{ margin: "5px 0" }}>
                        <b>{m.role === "user" ? "You" : "AI"}:</b> {m.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
                <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask something..."
                    style={{ width: "80%" }}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}


export default PromptChatUI;