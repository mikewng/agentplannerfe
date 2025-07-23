import { LoginProps } from "../../../contracts/loginprops";
import LoginOption from "./loginoption";

import "./login.scss"
import { useState } from "react";

const Login: React.FC<LoginProps> = ({ supportedApplications }) => {

    const [activeDropdown, setActiveDropdown] = useState(false);
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div className="login-container">
            <div className="login-wrapper"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <div className="login-text-button"
                    onClick={() => { setActiveDropdown(!activeDropdown) }}>Login to...</div>
                <div className={"login-options-dropdown-container" + (isHovered || activeDropdown ? " active" : "")}>
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