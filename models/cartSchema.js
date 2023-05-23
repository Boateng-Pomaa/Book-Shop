import mongoose from 'mongoose'

const { Schema, model } = mongoose

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', required: true
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books', required: true
    }
    ],
    quantity: {
        type: Number, required: true
    }
})

export const cartModel = model('carts', cartSchema)