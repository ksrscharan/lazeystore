import mongoose from 'mongoose'

import { productSchema } from '../schema/productSchema.js'
import { connectDB } from './mongoConnect.js'

connectDB();

const ProductModel = mongoose.model('Product', productSchema)

export const createProduct = async (product) => {
    const newProduct = await ProductModel.create(product)
    return newProduct
}

export const getProducts = async (title) => {
    return await ProductModel.find({})
}

export const updateProduct = async (productId, updatedFields) => {
    try {

        const filter = { _id: productId }
        const update = { $set: updatedFields }
        const options = { new: true }
        const updatedProduct = await ProductModel.findOneAndUpdate(filter, update, options)
        if (!updatedProduct) {
            console.log(`No product of ID: ${productId}`)
            return null
        }
        return updatedProduct
    } catch (e) {
        console.log(`error updating: ${e}`)
    }
}

export const deleteProduct = async (productId) =>{
    await ProductModel.findByIdAndDelete(productId)
}