import Form from "../components/LoginForm/LoginForm"
import { useNavigate, Link } from "react-router-dom"
import type { SignInData, SignUpData } from "../interfaces"
import { useState } from "react"

const SignUp = () => {
    const navigate = useNavigate()
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSignUp = (formData: SignUpData) => {
        setError("")

        if (!formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.password_confirmation) {
            setError("Please fill in all fields.")
            return
        }

        if (formData.password !== formData.password_confirmation) {
            setError("Passwords do not match.")
            return
        }

        const body = new FormData()
        body.append("email", formData.email)
        body.append("password", formData.password)
        body.append("password_confirmation", formData.password_confirmation)
        body.append("first_name", formData.first_name)
        body.append("last_name", formData.last_name)
        body.append("user_name", `${formData.first_name.toLowerCase()}_${formData.last_name.toLowerCase()}`)

        if (formData.profile_image) {
            body.append("profile_image", formData.profile_image)
        }

        setIsLoading(true)
        fetch("https://dashboard-i552.onrender.com/api/register", {
            headers: { "Accept": "application/json" },
            method: "POST",
            body: body
        })
        .then(res => res.json())
        .then(res => {
            if (res.data?.token) {
                localStorage.setItem("token", res.data.token)
                navigate("/dashboard")
            } else {
                setError(res.message || "Registration failed. Please try again.")
            }
        })
        .catch(() => setError("Something went wrong. Please try again."))
        .finally(() => setIsLoading(false))
    }

    const footer = (
        <p className="auth-switch">
            Do you have an account? 
            <Link to="/" className="auth-switch__link"> {" "}
                Sign in
            </Link>
        </p>
    )

    return (
        <div className="signup-page">
            <Form
                title="SIGN UP"
                paragraph="Fill in the following fields to create an account."
                inputs={[
                    { 
                        name: "first_name", 
                        type: "text", 
                        placeholder: "First Name",
                        label: "Name"
                    },
                    { 
                        name: "last_name", 
                        type: "text", 
                        placeholder: "Last Name"
                    },
                    { 
                        name: "email", 
                        type: "email", 
                        placeholder: "Enter your email",
                        label: "Email"
                    },
                    { 
                        name: "password", 
                        type: "password", 
                        placeholder: "Enter password",
                        label: "Password"
                    },
                    { 
                        name: "password_confirmation", 
                        type: "password", 
                        placeholder: "Re-enter your password"
                    },
                    { 
                        name: "profile_image", 
                        type: "file", 
                        placeholder: "Profile Image",
                        label: "Profile Image"
                    }
                ]}
                submit="SIGN UP"
                setData={handleSignUp as React.Dispatch<React.SetStateAction<SignInData | SignUpData>>}
                error={error}
                isLoading={isLoading}
                footer={footer}
            />
        </div>
    )
}

export default SignUp