'use client'
import Image from "next/image";
import MainScreen from "./MainScreen/mainscreen";
import { supportedApps } from "./util/calendarapplib";
import PromptingScreen from "./Prompting/promptingscreen";

export default function Home() {
  return (
    <div className="core-home-screen">
      <MainScreen supportedApplications={supportedApps} />

      {/* <PromptingScreen /> */}
    </div>
  );
}
