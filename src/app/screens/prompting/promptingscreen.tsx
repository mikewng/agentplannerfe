import PromptChatUI from "./components/promptchatui";

import "./promptingscreen.scss"
import SideBar from "./components/sidebar";

const PromptingScreen = () => {
    return (
        <div className="prompting-screen-container">
            <SideBar />
            <div className="prompting-main-body-container">
                <div className="prompting-header-container">
                    <div className="header-text">Chat</div>
                </div>
                <PromptChatUI />
            </div>
        </div>
    )
}

export default PromptingScreen;