import React, { useEffect } from 'react'
import ProductsList from '../../components/productsList/ProductsList'
import { useParams } from 'react-router-dom'

function ProductCategorySubCategoryList() {
  const { category, subCategory } = useParams()
  useEffect(()=>{
    console.log(category);
    console.log(subCategory);
    
  }, [category, subCategory])
  
  return (
    <ProductsList collectionKey={`${category}${subCategory}`} endpoint={`${import.meta.env.VITE_API_BASE_URL}/products/category/${encodeURIComponent(category)}/${encodeURIComponent(subCategory)}`}  params={{page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc"}} />
    
  )
}

export default ProductCategorySubCategoryList