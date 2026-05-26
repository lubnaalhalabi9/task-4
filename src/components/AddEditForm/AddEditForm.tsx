import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import type { AddEditFormProps, SignInData, SignUpData, ItemCreated } from "../../interfaces"
import uploadIcon from "../../assets/images/upload-icon.png"
import "./AddEditForm.css"

const Form = ({ title, inputs, submit, setData, setSubmit }: AddEditFormProps) => {
    const data = useRef<SignInData | SignUpData | ItemCreated>({} as SignInData)

    const fileInput  = inputs.find(i => i.type === "file")
    const textInputs = inputs.filter(i => i.type !== "file")

    // يبدأ بالصورة القديمة إن وُجدت، وإلا undefined
    const [preview, setPreview] = useState<string | undefined>(fileInput?.value)

    useEffect(() => {
        return () => {
            if (preview && preview.startsWith('blob:')) {  // الرابط المنشأ يبدأ ب blob:
                URL.revokeObjectURL(preview)  // تحرير الذاكرة
            }
        }
    }, [preview]) 
 
    const sendData = (event: FormEvent) => {
        event.preventDefault()
        setData(data.current)
        setSubmit(true)
    }

    return (
        <form className="aef" onSubmit={sendData}>
            <h1 className="aef__title">{title}</h1>

            <div className="aef__body">
                {/* Left — text fields */}
                <div className="aef__left">
                    {textInputs.map((input, index) => (
                        <div className="aef__field" key={index}>
                            {input.label && <label className="aef__label">{input.label}</label>}
                            <input
                                className="aef__input"
                                type={input.type}
                                placeholder={input.placeholder}
                                defaultValue={input.value}
                                onChange={(e) =>
                                    data.current = { ...data.current, [input.name]: e.target.value }
                                }
                                required
                            />
                        </div>
                    ))}
                </div>

                {/* Right — file upload */}
                {fileInput && (
                    <div className="aef__right">
                        {fileInput.label && <label className="aef__label">{fileInput.label}</label>}
                        <div className="aef__file-box">

                            {/* عرض الصورة المختارة أو القديمة، وإلا أيقونة الرفع */}
                            {preview
                                ? <img className="aef__preview" src={preview} alt="preview" />
                                : <img className="aef__upload-icon" src={uploadIcon} alt="upload" />
                            }

                            <input
                                className="aef__file-input"
                                type="file"
                                accept="image/*"  // نوع الملفات المسموح للمستخدم باختيارها من جهازه
                                onChange={(e) => {
                                    const file = e.target.files?.[0]
                                    if (!file) return
                                    setPreview(URL.createObjectURL(file))  //ينشئ رابطاً مؤقتاً لعرض الصورة فورا
                                    data.current = { ...data.current, [fileInput.name]: file }
                                }}
                                required={!fileInput.value}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="aef__footer">
                <input className="aef__submit" type="submit" value={submit} />
            </div>
        </form>
    )
}

export default Form
