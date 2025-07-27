import "./sidebar.scss"
import { useNavigation } from "../../../context/navigationContext";
import { useState } from "react";

const SideBar = () => {
    const { navigate } = useNavigation();
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <div className={"prompting-sidebar-container" + (isCollapsed ? " collapsed" : "")}>
            <div className={"prompting-sidebar-header-container" + (isCollapsed ? " collapsed" : "")}>
                {
                    !isCollapsed &&
                    <div className="sidebar-text">EVA</div>
                }
                <div className={"sidebar-position-icon" + (isCollapsed ? " collapsed" : "")} onClick={() => setIsCollapsed(!isCollapsed)}></div>
            </div>
            <div className="toolbar-container">
                <div className="toolbar-body-container">
                    <div className={"toolbar-option" + (isCollapsed ? " collapsed" : "")} onClick={() => { window.open('https://calendar.google.com/calendar/u/0/r', '_blank') }}>
                        <div className="option-icon-container">
                            <div className="option-icon" />
                        </div>
                        <div className="option-text">Open Calendar</div>
                    </div>
                </div>
                <div className="toolbar-footer-container">
                    <div className="logout-button" onClick={() => { navigate('main') }}>Logout</div>
                </div>
            </div>
        </div>
    )
}

export default SideBar;