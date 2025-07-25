import { useNavigation } from "@/app/context/navigationContext";
import { useAuth } from "@/app/context/authContext";


const LoginOption = ({ loginAppName }: { loginAppName: string }) => {
    const { currentPage, navigate } = useNavigation();
    const { isAuthenticated, loginCalendar } = useAuth();

    return (
        <div className="login-option-container"
            onClick={() => {
                loginCalendar()
                navigate(currentPage === 'main' ? 'prompt' : 'main')
            }}
        >
            {loginAppName}
        </div>
    )
}

export default LoginOption;