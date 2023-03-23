import mongoose from "mongoose"

const {Schema} = mongoose;

const productSchema = new Schema({
    name: String,
    price: {
        type: Number
    },
    creatAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('product', productSchema)
