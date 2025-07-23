import "./mainscreen.scss"
import { supportedApps } from "../util/calendarapplib";
import Login from "./components/login";
import { LoginProps } from "./contracts/loginprops";

const MainScreen: React.FC<LoginProps> = ({ supportedApplications = supportedApps }) => {
    return (
        <div className="main-screen-container">
            <div className="main-screen-header-container">
                <h1>Calendar Agent Planner</h1>
            </div>
            <div className="main-screen-subheader-container">
                <div className="subheader-text">Login to your calendar app and start planning!</div>
                <div className="subheader-supported-apps">
                    <div className="support-apps-text">Supported Calendar Applications</div>
                    {
                        supportedApps.map((x, i) => {
                            return (
                                <div className="supported-apps" key={i}>{x}</div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="main-screen-body-container">
                <Login supportedApplications={supportedApplications} />
            </div>
        </div>
    )
}

export default MainScreen;