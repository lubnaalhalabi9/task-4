import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar/Sidebar"
import "./DashboardRoot.css"
import userImage from "../../assets/images/userImage.jpg"

const DashboardRoot = () => {
    const userName = "Mohammed Alkordy"
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="dashboard-root">
            {/* زر الهامبرغر — يظهر فقط على الموبايل وعند إغلاق السايدبار */}
            {!sidebarOpen && (
                <button
                    className="dashboard-root__hamburger"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Open menu"
                >
                    <span /><span /><span />
                </button>
            )}

            {/* Overlay خلف السايدبار على الموبايل */}
            {sidebarOpen && (
                <div
                    className="dashboard-root__overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar
                userName={userName}
                userImage={userImage}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="dashboard-root__content">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardRoot
