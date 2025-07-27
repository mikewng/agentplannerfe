import { useNavigation } from "../context/navigationContext";
import "./toolbar.scss"

const ToolBar = () => {
    const { navigate } = useNavigation();

    return (
        <div className="toolbar-container">
            <div className="toolbar-header-container">
                <div className="header-text">Tools</div>
            </div>
            <div className="toolbar-body-container">
                <div className="toolbar-option" onClick={() => { window.open('https://calendar.google.com/calendar/u/0/r', '_blank') }}>Open Calendar</div>
            </div>
            <div className="toolbar-footer-container">
                <div className="logout-button" onClick={() => { navigate('main') }}>Logout</div>
            </div>
        </div>
    )
}

export default ToolBar;