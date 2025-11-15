import {createProduct, deleteProduct, getProducts, updateProduct} from '../models/productModel.js';

export const productCreate = async (req, res) =>{
    try{
        const product = req.body
        await createProduct(product)
        return res.json(200).json({message: "Created SuccessFully"})
    }catch(e){
        return res.status(500).json({message: e.message})
    }
}

export const productsGet = async (req, res)=> {
    try {
        
        const products = await getProducts();
        if(products){
            return res.status(200).json(products)
        }
        return res.status(400).json({message: "No Products to fetch"})
    } catch(e){
        return res.status(500).json({message: `Couldn't fetch Products ${e.message}`})
    }
}

export const productUpdate = async (req, res) =>{
    try {
        // find by id, check validity, edge cases
        const {id, updateFields} = req.body
        await updateProduct(id, updateFields)
        return res.status(200).json({message: "Updated Successfully"})
    } catch(e){
        return res.status(500).json({message: `Error Updating Product: ${e.message}`})
    }
}

export const productDelete = async (req, res) =>{
    try {
        const id = req.body
        await deleteProduct(id)
        return res.status(200).json({message: `Deleted Product with ID ${id}`})
    }catch(e){
        return res.status(500).json({message: e.message})
    }
}