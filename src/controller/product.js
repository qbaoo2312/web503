import Joi from "joi"
import productSchema from '../models/product'

const data = [
    { id: 1, name: "Chuột", price: 100 },
    { id: 2, name: "Bàn phím", price: 200 },
    { id: 3, name: "Màn hình", price: 500 },
]

const productValidate = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(100).required(),
    description: Joi.string(),
    thumbnail: Joi.string()
})

export const getProduct = (req, res) => {
    try {
        res.send(data)
        res.end()
    } catch (error) {
        res.status(500).send({
            message: "Lỗi server"
        })
        res.end()
    }
}

export const getProductById = (req, res) => {
    try {
        const id = req.params.id
        const product = data.find((item) => item.id == id)
        if (product) {
            res.send(product)
        } else {
            res.status(400).send({
                message: "San pham khong ton tai!"
            })
        }
    } catch(error) {
        res.status(500).send({
            message: "Lỗi server"
        })
        res.end()
    }
}

export const createProduct = async (req, res) => {
    const newData = req.body
    const {error} = productValidate.validate(newData, {abortEarly: false})
    if(error) {
        res.status(400).send({
            errors : error.details.map(e => e.message)
        })
    } else {
        // Them vao DB
        const data = await productSchema.create(newData)
        console.log(data);
        res.send({
            message: "Thêm mới thành công",
            data: data
        })
        res.end()
    }
}

export const updateProduct = (req, res) => {
    const id = req.params.id
    const updateData = req.body
    const productIndex = data.findIndex(item => item.id == id)
    if (productIndex >= 0) {
        data[productIndex] = { ...data[productIndex], ...updateData }
        console.log(updateData);
        res.send(data[productIndex])
        res.end()
    } else {
        res.status(400).send("Sản phẩm không tồn tại!")
    }
}

export const deleteProduct = (req, res) => {
    try {
        const id = req.params.id
        const productIndex = data.findIndex(item => item.id == id)
        if (productIndex >= 0) {
            data.splice(productIndex, 1)
            res.json(data)
            res.end()
        } else {
            res.status(400).send("Sản phẩm không tồn tại!")
        }
    } catch(error) {
        res.status(500).send({
            message: "Lỗi server"
        })
        res.end()
    }

}