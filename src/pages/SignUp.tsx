import Form from "../components/LoginForm/LoginForm"
import { useNavigate, Link } from "react-router-dom"
import type { SignInData, SignUpData } from "../interfaces"

const SignUp = () => {
    const navigate = useNavigate()

    const handleSignUp = (formData: SignUpData) => {
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

        fetch("https://dashboard-i552.onrender.com/api/register", {
            headers: { "Accept": "application/json" },
            method: "POST",
            body: body
        })
        .then(res => res.json())
        .then(res => {
            console.log("API Response:", res)
            if (res.data?.token) {
                localStorage.setItem("token", res.data.token)
                navigate("/dashboard")
            }
        })
        .catch(err => console.log(err))
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
                footer={footer}
            />
        </div>
    )
}

export default SignUp