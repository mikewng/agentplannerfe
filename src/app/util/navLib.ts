import MainScreen from "../MainScreen/mainscreen"
import PromptingScreen from "../Prompting/promptingscreen"

export const navMapping: { [key: string]: React.ComponentType<any> } = {
    "main": MainScreen,
    "prompting": PromptingScreen,
}