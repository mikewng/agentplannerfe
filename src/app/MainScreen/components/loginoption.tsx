const LoginOption = ({ loginAppName }: { loginAppName: string }) => {
    return (
        <div className="login-option-container">
            {loginAppName}
        </div>
    )
}

export default LoginOption;