import { useEffect, useState } from "react"
import Form from "../components/LoginForm/LoginForm"
import { Link, useNavigate } from "react-router-dom"
import type { SignInData } from "../interfaces"
import "./auth.css"

const SignIn = () => {
  const navigate = useNavigate()

  const [data, setData] = useState<SignInData>({ email: "", password: "" })

  useEffect(() => {
    if (data.email !== "" && data.password !== "") {
      const body = new FormData()
      body.append("email", data.email)
      body.append("password", data.password)

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
          }
        })
        .catch((err) => console.log(err))
    }
  }, [data, navigate])

  return (
    <Form
      title="SIGN IN"
      paragraph="Enter your credentials to access your account"
      inputs={[
        { name: "email", type: "email", label: "Email" , placeholder: "Enter your email" },
        { name: "password", type: "password", label: "Password", placeholder: "Enter your password" },
      ]}
      submit="SIGN IN"
      setData={setData}
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
