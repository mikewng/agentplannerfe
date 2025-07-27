import "./sidebar.scss"
import { useNavigation } from "../../../context/navigationContext";

const SideBar = () => {
    const { navigate } = useNavigation();

    return (
        <div className="prompting-sidebar-container">
            <div className="prompting-sidebar-header-container">
                <div className="sidebar-text">EVA</div>
                <div className="sidebar-text">{"<<"}</div>
            </div>
            <div className="toolbar-container">
                <div className="toolbar-body-container">
                    <div className="toolbar-option" onClick={() => { window.open('https://calendar.google.com/calendar/u/0/r', '_blank') }}>Open Calendar</div>
                </div>
                <div className="toolbar-footer-container">
                    <div className="logout-button" onClick={() => { navigate('main') }}>Logout</div>
                </div>
            </div>
        </div>
    )
}

export default SideBar;