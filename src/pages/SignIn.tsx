import { useState } from "react"
import Form from "../components/LoginForm/LoginForm"
import { Link, useNavigate } from "react-router-dom"
import type { SignInData } from "../interfaces"
import "./auth.css"

const SignIn = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignIn = (formData: SignInData) => {
    setError("")

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.")
      return
    }

    const body = new FormData()
    body.append("email", formData.email)
    body.append("password", formData.password)

    setIsLoading(true)
    fetch("https://dashboard-i552.onrender.com/api/login", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: body,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token)
          navigate("/dashboard")
        } else if (res.data?.token) {
          localStorage.setItem("token", res.data.token)
          navigate("/dashboard")
        } else {
          setError(res.message || "Invalid email or password.")
        }
      })
      .catch(() => setError("Something went wrong. Please try again."))
      .finally(() => setIsLoading(false))
  }

  return (
    <Form
      title="SIGN IN"
      paragraph="Enter your credentials to access your account"
      inputs={[
        { name: "email", type: "email", label: "Email" , placeholder: "Enter your email" },
        { name: "password", type: "password", label: "Password", placeholder: "Enter your password" },
      ]}
      submit="SIGN IN"
      setData={handleSignIn as React.Dispatch<React.SetStateAction<SignInData>>}
      error={error}
      isLoading={isLoading}
      footer={
        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-switch__link">
            Create one
          </Link>
        </p>
      }
    />
  )
}

export default SignIn
