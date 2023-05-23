import mongoose from "mongoose"

const { Schema, model } = mongoose

const orders = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'books', required: true }],
    amount: { type: Number },
    status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered'], default: 'pending' },
    address: { type: String },
    payment:{type:Number}
},
    { timestamps: true }
    )

    export const orderModel = model('orders',orders)