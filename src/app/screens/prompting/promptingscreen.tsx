import PromptChatUI from "./components/promptchatui";

import "./promptingscreen.scss"

const PromptingScreen = () => {
    return (
        <div className="prompting-screen-container">
            <div className="prompting-sidebar-container">
                Logout
            </div>
            <div className="prompting-main-body-container">
                <div className="prompting-header-container">
                    <div className="header-text">EVA</div>
                </div>
                <PromptChatUI />
            </div>
        </div>
    )
}

export default PromptingScreen;