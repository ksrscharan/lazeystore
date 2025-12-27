import {
    addItemToCart,
    addItemToWishlist,
    reduceQuantityCart,
    removeItemFromCart,
    removeItemFromWishlist,
    submitReview
} from "../models/userProductModel.js";

export const submitUserReview = async (req, res) => {
    const { productId, rating, reviewTitle, reviewComment } = req.body;
    const user = req.user

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }
    try {
        const updatedProduct = await submitReview(productId, user, rating, reviewTitle, reviewComment)
        if (!updatedProduct) {
            return res.status(400).json({ message: "No Product Found" })
        }
        return res.status(201).json({ message: "Review submitted Successfully", data: updatedProduct })

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

export const addToWishlist = async (req, res) => {
    const { productDetails } = req.body
    const user = req.user
    try {
        const updatedUser = await addItemToWishlist(productDetails, user)
        if (!updatedUser) {
            return res.status(400).json({ message: "User Not Found. Check User Details" })
        }
        return res.status(201).json({ message: "Product added to Wishlist", data: updatedUser })

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

export const removeFromWishlist = async (req, res) => {
    const { productDetails } = req.body
    const user = req.user
    try {
        const updatedUser = await removeItemFromWishlist(productDetails, user)
        if (!updatedUser) {
            return res.status(400).json({ message: "User Not Found. Check User Details" })
        }
        return res.status(201).json({ message: "Product Removed to Wishlist", data: updatedUser })

    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

export const addToCart = async (req, res) => {
    const { productDetails } = req.body
    const user = req.user
    try {
        const updatedUser = await addItemToCart(productDetails, user)
        if (!updatedUser) {
            return res.status(400).json({ message: "User Not Found. Check User Details" })
        }
        return res.status(201).json({ message: "Product added to Cart", data: updatedUser })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
export const removeFromCart = async (req, res) => {
    const { productDetails } = req.body
    const user = req.user
    try {
        const updatedUser = await removeItemFromCart(productDetails, user)
        if (!updatedUser) {
            return res.status(400).json({ message: "User Not Found. Check User Details" })
        }
        return res.status(201).json({ message: "Product Removed from Cart", data: updatedUser })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
export const reduceProductQuantityCart = async (req, res) => {
    const { productDetails } = req.body
    const user = req.user
    try {
        const updatedUser = await reduceQuantityCart(productDetails, user)
        if (!updatedUser) {
            return res.status(400).json({ message: "User Not Found. Check User Details" })
        }
        return res.status(201).json({ message: "Product Reduced in Quantity", data: updatedUser })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
