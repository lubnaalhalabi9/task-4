import { useEffect } from "react"
import "./Toast.css"

type ToastType = "success" | "error" | "warning"

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
  duration?: number
}

const icons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "⚠",
}

const Toast = ({ message, type, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`toast toast--${type}`}>
      <span className="toast__icon">{icons[type]}</span>
      <span className="toast__message">{message}</span>
      <button className="toast__close" onClick={onClose}>✕</button>
      <div className="toast__progress" style={{ animationDuration: `${duration}ms` }} />
    </div>
  )
}

export default Toast
