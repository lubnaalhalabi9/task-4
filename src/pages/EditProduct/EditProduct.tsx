import { useEffect, useState } from "react"
import type { Item, ItemCreated } from "../../interfaces"
import { useNavigate, useParams } from "react-router-dom"
import AddEditForm from "../../components/AddEditForm/AddEditForm"
import BackButton from "../../components/BackButton/BackButton"
import Toast from "../../components/Toast/Toast"
import "./EditProduct.css"

const AddProduct = () => {
    const [data, setData] = useState<ItemCreated | undefined>()
    const [oldData, setOldData] = useState<Item>()
    const [submit, setSubmit] = useState<boolean>(false)
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)
    const navigate = useNavigate()

    const {id} = useParams()
    useEffect(() => {
        fetch(`https://dashboard-i552.onrender.com/api/items/${id}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token") ?? ""}`
            },
        })
        .then((res) => res.json())
        .then((res) => setOldData(res))
        .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        if (!submit) return

        const body = new FormData()
        body.append("name", data?.name ?? oldData?.name ?? "")
        body.append("price", data?.price ?? oldData?.price ?? "")
        body.append("_method", "PUT")
        if (data?.image) body.append("image", data.image)

        fetch(`https://dashboard-i552.onrender.com/api/items/${id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token") ?? ""}`
            },
            body
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setSubmit(false)
                setToast({ message: "Product updated successfully!", type: "success" })
                setTimeout(() => navigate("/dashboard"), 1500)
            })
            .catch(err => {
                console.log(err)
                setSubmit(false)
                setToast({ message: "Failed to update product. Try again.", type: "error" })
            })
    }, [submit, data])

    return (
        <div className="add-product">
            <BackButton />
            {!oldData ? <p className="show-loading">Loading...</p> : <AddEditForm
                title="EDIT ITEM"
                inputs={[
                    { name: "name",  type: "text", placeholder: "Enter the product name",  label: "Name" , value: oldData?.name },
                    { name: "price", type: "number", placeholder: "Enter the product price", label: "Price" , value: oldData?.price },
                    { name: "image", type: "file", placeholder: "", label: "Image" , value: oldData?.image_url },
                ]}
                submit="Save"
                setData={setData}
                setSubmit={setSubmit}
            />}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    )
}

export default AddProduct
