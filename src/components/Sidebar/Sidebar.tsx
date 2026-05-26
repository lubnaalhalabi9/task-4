import { NavLink, useNavigate } from "react-router-dom"
import "./Sidebar.css"
import logo from "../../assets/images/logo.png"
import productsIcon from "../../assets/images/productsIcon.png"
import bookmark from "../../assets/images/bookmark.png"
import logoutIcon    from "../../assets/images/logoutIcon.png"
import type { SidebarProps } from "../../interfaces"


const navItems = [
    {
        label: "Products",
        to: "/dashboard",
        icon: productsIcon,
    },
    {
        label: "Favorites",
        to: "/dashboard/favorites",
        icon: bookmark,
    },
    {
        label: "Order list",
        to: "/dashboard/orders",
        icon: bookmark,
    },
]

const Sidebar = ({ userName = "User", userImage, isOpen, onClose }: SidebarProps) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        if (localStorage.getItem("token")) {
            fetch("https://dashboard-i552.onrender.com/api/logout" , {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json"
                }
            })
            .then(res => res.json())
            .then(() => {
                localStorage.removeItem("token")
                navigate ("/")
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
            {/* Close button - mobile only*/}
            <button className="sidebar__close" onClick={onClose} aria-label="Close menu">
                &#10005;
            </button>
            {/* Logo */}
            <div className="sidebar__logo-wrapper">
                <img src={logo} alt="FocalX Logo" className="sidebar__logo" />
            </div>

            {/* User info */}
            <div className="sidebar__user">
                <div className="sidebar__avatar-wrapper">
                    {userImage ? (
                        <img src={userImage} alt={userName} className="sidebar__avatar" />
                    ) : (
                        <div className="sidebar__avatar-placeholder">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <p className="sidebar__username">{userName}</p>
            </div>

            {/* Nav links */}
            <nav className="sidebar__nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={onClose}
                        className={({ isActive }) =>
                            `sidebar__nav-item ${isActive ? "sidebar__nav-item-active" : ""}`
                        }
                    >
                        {item.icon ? (
                            <img src={item.icon} alt={item.label} className="sidebar__nav-icon" />
                        ) : (
                            <span className="sidebar__nav-icon-placeholder" />
                        )}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <button className="sidebar__logout" onClick={handleLogout}>
                <span>Logout</span>
                  <img src={logoutIcon} alt="Logout" />
                <span className="sidebar__nav-icon-placeholder sidebar__nav-icon-placeholder-logout" />
            </button>
        </aside>
    )
}

export default Sidebar
