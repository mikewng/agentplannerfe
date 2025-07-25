import "./toolbar.scss"

const ToolBar = () => {
    return (
        <div className="toolbar-container">
            <div className="toolbar-header-container">
                <div className="header-text">Tools</div>
            </div>
            <div className="toolbar-body-container">
                <div className="toolbar-option">Open Calendar</div>
            </div>
            <div className="toolbar-footer-container">
                <div className="logout-button">Logout</div>
            </div>
        </div>
    )
}

export default ToolBar;