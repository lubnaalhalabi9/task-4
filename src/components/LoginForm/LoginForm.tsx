import { useRef, useState } from "react"
import type { FormProps1, SignInData, SignUpData } from "../../interfaces"
import logo from "../../assets/images/logo.png"
import uploadIcon from "../../assets/images/upload-icon.png"
import "./LoginForm.css"

const Form = ({ title, paragraph, inputs, submit, setData, footer, error, isLoading }: FormProps1) => {
    const data = useRef<Partial<SignInData & SignUpData>>({})
    const [preview, setPreview] = useState<string | null>(null)

    const sendData = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setData(data.current as SignInData | SignUpData)
    }

    return (
        <form className="form auth-card" onSubmit={sendData}>
            <div className="form__logo-wrapper">
                <img src={logo} alt="Logo" className="form__logo" />
            </div>
            <h2 className="form__title">{title}</h2>
            <p className="form__paragraph">{paragraph}</p>
            {inputs.map((input, index) => {
                // تجميع first_name و last_name في صف واحد
                if (input.name === "first_name") {
                    const lastNameInput = inputs.find(i => i.name === "last_name");
                    if (lastNameInput) {
                        return (
                            <div key="name-group" className="form__row">
                                <div className="form__field form__field--half">
                                    <label className="form__label">{input.label}</label>
                                    <input
                                        name={input.name}
                                        type={input.type}
                                        className="form__input"
                                        placeholder={input.placeholder}
                                        onChange={(e) => {
                                            data.current = {
                                                ...data.current,
                                                [input.name]: e.target.value
                                            }
                                        }}
                                    />
                                </div>
                                <div className="form__field form__field--half">
                                    <input
                                        name={lastNameInput.name}
                                        type={lastNameInput.type}
                                        className="form__input last_name__password"
                                        placeholder={lastNameInput.placeholder}
                                        onChange={(e) => {
                                            data.current = {
                                                ...data.current,
                                                [lastNameInput.name]: e.target.value
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    }
                }
                
                // تخطي last_name لأنه تم عرضه مع first_name
                if (input.name === "last_name") return null;
                
                // تجميع password و password_confirmation في صف واحد
                if (input.name === "password") {
                    const confirmPasswordInput = inputs.find(i => i.name === "password_confirmation");
                    if (confirmPasswordInput) {
                        return (
                            <div key="password-group" className="form__row">
                                <div className="form__field form__field--half">
                                    <label className="form__label">{input.label}</label>
                                    <input
                                        name={input.name}
                                        type={input.type}
                                        className="form__input"
                                        placeholder={input.placeholder}
                                        onChange={(e) => {
                                            data.current = {
                                                ...data.current,
                                                [input.name]: e.target.value
                                            }
                                        }}
                                    />
                                </div>
                                <div className="form__field form__field--half">
                                    <input
                                        name={confirmPasswordInput.name}
                                        type={confirmPasswordInput.type}
                                        className="form__input last_name__password"
                                        placeholder={confirmPasswordInput.placeholder}
                                        onChange={(e) => {
                                            data.current = {
                                                ...data.current,
                                                [confirmPasswordInput.name]: e.target.value
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    }
                }
                
                // تخطي password_confirmation لأنه تم عرضه مع password
                if (input.name === "password_confirmation") return null;
                
                return (
                    <div key={index} className="form__field">
                        {input.label && (
                            <label className="form__label" htmlFor={input.name}>
                                {input.label}
                            </label>
                        )}
                        {input.type === "file" ? (
                            <div className="form__file-box">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form__file-input"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            data.current = { ...data.current, [input.name!]: file }
                                            setPreview(URL.createObjectURL(file))
                                        }
                                    }}
                                />
                                {preview
                                    ? <img src={preview} alt="preview" className="form__file-preview" />
                                    : <img src={uploadIcon} alt="upload" className="form__file-icon" />
                                }
                            </div>
                        ) : (
                            <input
                                id={input.name}
                                className="form__input"
                                name={input.name}
                                type={input.type}
                                placeholder={input.placeholder}
                                onChange={(e) => {
                                    data.current = { ...data.current, [input.name!]: e.target.value }
                                }}
                            />
                        )}
                    </div>
                )
            })}
            <button type="submit" className="form__submit" disabled={isLoading}>
                {isLoading ? "Sending..." : submit}
            </button>
            {error && <p className="form__error">{error}</p>}
            {footer && <div className="form__footer">{footer}</div>}
        </form>
    )
}

export default Form
