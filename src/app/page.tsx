'use client'
import { useAuth } from "./context/authContext";
import { useNavigation } from "./context/navigationContext";
import MainScreen from "./screens/mainscreen/mainscreen";
import PromptingScreen from "./screens/prompting/promptingscreen";
import { supportedApps } from "./util/calendarapplib";

export default function Home() {
  const { currentPage, navigate } = useNavigation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="core-home-screen">
      {
        currentPage === 'main' &&
        <MainScreen supportedApplications={supportedApps} />
      }
      {
        (currentPage == 'prompt' && isAuthenticated) &&
        <PromptingScreen />
      }
      {
        (currentPage == 'prompt' && !isAuthenticated) &&
        <div className="loading">Waiting for Authentication...</div>
      }

    </div>
  );
}
