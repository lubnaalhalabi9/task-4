import { useNavigate } from "react-router-dom"
import "./BackButton.css"

const BackButton = () => {
    const navigate = useNavigate()

    return (
        <button className="back-btn" onClick={() => navigate(-1)}>
            &#8249;
        </button>
    )
}

export default BackButton
