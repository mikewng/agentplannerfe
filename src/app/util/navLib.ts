import MainScreen from "../screens/mainscreen/mainscreen"
import PromptingScreen from "../screens/prompting/promptingscreen"

export const navMapping: { [key: string]: React.ComponentType<any> } = {
    "main": MainScreen,
    "prompt": PromptingScreen,
}