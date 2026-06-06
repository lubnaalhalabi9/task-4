import { useEffect, useState } from "react"
import type { ItemCreated } from "../../interfaces"
import { useNavigate } from "react-router-dom"
import AddEditForm from "../../components/AddEditForm/AddEditForm"
import BackButton from "../../components/BackButton/BackButton"

const AddProduct = () => {
    const [data, setData] = useState<ItemCreated>()
    const navigate = useNavigate()

    useEffect(() => {
        if (!data?.name) return

        const body = new FormData()
        body.append("name", data.name)
        body.append("price", data.price)
        if (data.image) body.append("image", data.image)

        fetch("https://dashboard-i552.onrender.com/api/items", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token") ?? ""}`
            },
            body
        })
            .then(res => res.json())
            .then((res) =>{ console.log(res)
                navigate("/dashboard")})
            .catch(err => console.log(err))
    }, [data])

    return (
        <div>
            <BackButton />
            <AddEditForm
                title="Add New Item"
                inputs={[
                    { name: "name",  type: "text",  placeholder: "Enter the product name" ,  label: "Name"},
                    { name: "price", type: "number",  placeholder: "Enter the product price",  label: "Price" },
                    { name: "image", type: "file",  placeholder: "" ,  label: "Image"},
                ]}
                submit="Save"
                setData={setData}
            />
        </div>
    )
}

export default AddProduct
