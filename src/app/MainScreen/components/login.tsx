import { LoginProps } from "../contracts/loginprops";
import LoginOption from "./loginoption";

const Login: React.FC<LoginProps> = ({ supportedApplications }) => {
    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-text">Login to...</div>
                <div className="login-options-dropdown-container">
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