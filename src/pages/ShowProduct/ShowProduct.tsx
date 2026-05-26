import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Item } from "../../interfaces"
import BackButton from "../../components/BackButton/BackButton"
import defaultProduct from "../../assets/images/defaultProduct.png"
import "./ShowProduct.css"

const formatDate = (d: string): string => {
    const date = new Date(d)
    const day   = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year  = date.getFullYear()
    return `${day}/${month}/${year}`
}

const ShowProduct = () => {
    const { id } = useParams<{ id: string }>()
    const [item, setItem] = useState<Item | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://dashboard-i552.onrender.com/api/items/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setItem(res)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [id])

    if (loading) return <div className="show-loading">Loading...</div>
    if (!item)   return <div className="show-loading">Product not found.</div>

    return (
        <div className="show-product">
            <BackButton />

            <h1 className="show-product__name">{item.name}</h1>

            <div className="show-product__image-wrapper">
                <img
                    src={item.image_url}
                    alt={item.name}
                    className="show-product__image"
                    onError={(e) => { e.currentTarget.src = defaultProduct }}
                />
            </div>

            <div className="show-product__meta">
                <p className="show-product__meta-item">
                    <span className="show-product__meta-label">Price:</span>
                    <span className="show-product__meta-value">{item.price}$</span>
                </p>
                <p className="show-product__meta-item">
                    <span className="show-product__meta-label">Added At:</span>
                    <span className="show-product__meta-value">{formatDate(item.created_at)}</span>
                </p>
            </div>
            <div className="show-product__updated-wrapper">
                <p className="show-product__meta-item updated-at">
                    <span className="show-product__meta-label">Updated At:</span>
                    <span className="show-product__meta-value">{formatDate(item.updated_at)}</span>
                </p>
            </div>
        </div>
    )
}

export default ShowProduct
