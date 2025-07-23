import { LoginProps } from "../../../contracts/loginprops";
import LoginOption from "./loginoption";

import "./login.scss"
import { useState } from "react";

const Login: React.FC<LoginProps> = ({ supportedApplications }) => {

    const [activeDropdown, setActiveDropdown] = useState(false);

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-text-button" onClick={() => { setActiveDropdown(!activeDropdown) }}>Login to...</div>
                <div className={"login-options-dropdown-container" + (activeDropdown ? " active" : "")}>
                    {
                        supportedApplications.map((app, i) => {
                            return (
                                <LoginOption loginAppName={app} key={i} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Login;