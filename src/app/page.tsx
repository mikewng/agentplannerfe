'use client'
import { useNavigation } from "./context/navigationContext";
import MainScreen from "./screens/mainscreen/mainscreen";
import PromptingScreen from "./screens/prompting/promptingscreen";
import { supportedApps } from "./util/calendarapplib";

export default function Home() {
  const { currentPage, navigate } = useNavigation();

  return (
    <div className="core-home-screen">
      <button onClick={() => navigate(currentPage === 'main' ? 'prompt' : 'main')} style={{ position: 'absolute', top: '0%', left: '0%' }}>switch</button>
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
