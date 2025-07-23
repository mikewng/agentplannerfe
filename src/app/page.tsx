'use client'
import { useNavigation } from "./context/navigationContext";
import MainScreen from "./screens/mainscreen/mainscreen";
import PromptingScreen from "./screens/prompting/promptingscreen";
import { supportedApps } from "./util/calendarapplib";

export default function Home() {
  const { currentPage } = useNavigation();

  return (
    <div className="core-home-screen">
      {
        currentPage === 'main' &&
        <MainScreen supportedApplications={supportedApps} />
      }
      {
        currentPage == 'prompt' &&
        <PromptingScreen />
      }
    </div>
  );
}
