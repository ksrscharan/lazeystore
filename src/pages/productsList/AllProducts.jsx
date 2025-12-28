import { useSearchParams } from "react-router-dom";
import ProductsList from "../../components/productsList/ProductsList";
import { useEffect } from "react";
import { useSelector } from "react-redux";


function AllProducts() {


    return (
        <ProductsList collectionKey={"All"} endpoint={`${import.meta.env.VITE_API_BASE_URL}/products/get`} />)
}

export default AllProducts