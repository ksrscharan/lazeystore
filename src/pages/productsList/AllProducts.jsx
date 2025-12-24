import { useSearchParams } from "react-router-dom";
import ProductsList from "../../components/productsList/ProductsList";
import { useEffect } from "react";
import { useSelector } from "react-redux";


function AllProducts() {


    return (
        <ProductsList collectionKey={"All"} endpoint={'http://localhost:3000/products/get'} />
    )
}

export default AllProducts