import { useNavigation } from "@/app/context/navigationContext";

const LoginOption = ({ loginAppName }: { loginAppName: string }) => {
    const { currentPage, navigate } = useNavigation();

    return (
        <div className="login-option-container" onClick={() => navigate(currentPage === 'main' ? 'prompt' : 'main')}>
            {loginAppName}
        </div>
    )
}

export default LoginOption;