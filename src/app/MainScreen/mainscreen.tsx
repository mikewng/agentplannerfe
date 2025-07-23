import "./mainscreen.scss"
import { supportedApps } from "../util/calendarapplib";
import Login from "./components/login";
import { LoginProps } from "./contracts/loginprops";

const MainScreen: React.FC<LoginProps> = ({ supportedApplications = supportedApps }) => {
    return (
        <div className="main-screen-container">
            <div className="main-screen-header-container">
                <div className="header-text">Hello, I am EVA.</div>
                <div className="header2-text">Your calendar planner agent.</div>
            </div>
            <div className="main-screen-body-container">
                <div className="main-screen-subheader-container">
                    <div className="subheader-text">Login to your calendar app and start planning!</div>
                </div>
                <div className="main-screen-login-container">
                    <Login supportedApplications={supportedApplications} />
                </div>
            </div>
        </div>
    )
}

export default MainScreen;