import express from "express";
import { createProduct, deleteProduct, getProduct, getProductById, updateProduct } from "../controller/product";

const router = express.Router()



// Miiddleware
router.use((req, res, next) => {
    next()
})

router.get('/products', getProduct)

// Get product by ID
router.get('/products/:id', getProductById)

// Created
router.post('/products', createProduct)

// Updated
router.put('/products/:id', updateProduct)

// Delete
router.delete("/products/:id", deleteProduct)

export default router