import mongoose from 'mongoose'

const { Schema, model } = mongoose

const cartSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'booksModel', required: true }]
})

export const cartModel = model('cart', cartSchema)