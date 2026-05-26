import { Outlet } from 'react-router-dom'
import './AuthRoot.css'

const AuthRoot = () => {
  return (
    <div className="auth-root">
      <Outlet />
    </div>
  )
}

export default AuthRoot
