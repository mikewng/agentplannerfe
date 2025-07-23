import PromptChatUI from "./components/promptchatui";

import "./promptingscreen.scss"

const PromptingScreen = () => {
    return (
        <div className="prompting-screen-container">
            <div className="prompting-header-container">
                <div className="header-text">What's on your mind?</div>
            </div>
            <PromptChatUI />
        </div>
    )
}

export default PromptingScreen;