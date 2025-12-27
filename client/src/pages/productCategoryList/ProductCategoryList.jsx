import { useParams } from 'react-router-dom'
import ProductsList from '../../components/productsList/ProductsList'

function ProductCategoryList() {
  const { category } = useParams()

  return (

    <ProductsList collectionKey={category} endpoint={`http://localhost:3000/products/category/${encodeURIComponent(category)}`} params={{page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc"}} />
  )
}

export default ProductCategoryList