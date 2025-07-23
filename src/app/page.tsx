'use client'
import MainScreen from "./screens/mainscreen/mainscreen";
import { supportedApps } from "./util/calendarapplib";

export default function Home() {
  return (
    <div className="core-home-screen">
      <MainScreen supportedApplications={supportedApps} />
    </div>
  );
}
