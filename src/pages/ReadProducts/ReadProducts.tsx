import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./ReadProducts.css"
import type { Item } from "../../interfaces"
import searchIcon from "../../assets/images/searchIcon.png"
import defaultProduct from "../../assets/images/defaultProduct.png"

const ReadProducts = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<Array<Item>>([])
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)
  const [search, setSearch] = useState<string>("")
  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  const filtered = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  ) 

  // حساب المنتجات الحالية
  const currentItems = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  // حساب عدد الصفحات و تقريبها لاقرب عدد باستخدام Math.ceil
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  // إعادة تعيين الصفحة عند البحث
  useEffect(() => {
    setPage(1)
  }, [search])

  useEffect(() => {
    fetch('https://dashboard-i552.onrender.com/api/items', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      // API may return { data: [...] } or a plain array
      const items = Array.isArray(res) ? res : (res.data ?? res.items ?? [])
      setData(items)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
  }, [refresh])

  const openDeleteModal = (id: number, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedItemId(id)
    setShowModal(true)
  }

  const confirmDelete = () => {
    if (selectedItemId) {
      fetch(`https://dashboard-i552.onrender.com/api/items/${selectedItemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json'
        }
      })
      .then(res => res.json())
      .then(() => {
        setRefresh(!refresh)
        setShowModal(false)
        setSelectedItemId(null)
      })
      .catch(err => console.log(err))
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedItemId(null)
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5 // عدد الأزرار الظاهرة
    
    if (totalPages <= maxVisible) {
      // إذا كان عدد الصفحات قليل، اعرض كل الأزرار
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      // عرض أول 3 صفحات
      if (page <= 3) {
        for (let i = 1; i <= 3; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
      // عرض آخر 3 صفحات
      else if (page >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      }
      // عرض الصفحة الحالية وما حولها
      else {
        pages.push(1)
        pages.push('...')
        for (let i = page - 1; i <= page + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    return pages
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }
  
  return (
    <div className="products-container container">
      <div className="products-topbar">
        <input
            type="text"
            className="products-search"
            placeholder="Search product by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-icon__container">
            <img src={searchIcon} alt="Search" className="search-icon" />
        </div>
      </div>
      <div className="products-add-btn__container">
        <Link to="/dashboard/add" className="products-add-btn">
          ADD NEW PRODUCT
        </Link>
      </div>
      
      <div className="products-grid">
        {currentItems.map(item => (
          <div
            key={item.id}
            className="product-card"
            onClick={() => navigate(`/dashboard/products/${item.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="product-image-wrapper">
              <img 
                src={item.image_url} 
                alt={item.name} 
                className="product-image"
                onError={(e) => { 
                  e.currentTarget.src = defaultProduct
                  e.currentTarget.className = "product-image product-image-default"
                }}
              />
              <div className="product-overlay">
                <h3 className="product-name">{item.name}</h3>
                <div className="product-actions">
                  <Link to={`/dashboard/edit/${item.id}`} className="edit-btn" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                    Edit
                  </Link>
                  <button 
                    className="delete-btn" 
                    onClick={(e) => openDeleteModal(item.id, e)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="page-btn"
          >
            &#8249;
          </button>
          
          {getPageNumbers().map((p, i) => (
            p === '...' ? 
              <span key={i} className="dots">...</span> :
              <button
                key={i}
                onClick={() => setPage(p as number)}
                className={`page-btn ${page === p ? 'active' : ''}`}
              >
                {p}
              </button>
          ))}
          
          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="page-btn"
          >
            &#8250;
          </button>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?</h3>
            </div>
            <div className="modal-actions">
              <button className="modal-btn modal-btn-no" onClick={closeModal}>
                No
              </button>
              <button className="modal-btn modal-btn-yes" onClick={confirmDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReadProducts  