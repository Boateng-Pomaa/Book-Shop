import express from 'express'
const router = express.Router()
import { check } from 'express-validator'
import {
    register, login, viewAllBooks, searchBooks, addBookToCart,
    viewCart, clearCart, placingOrder, makePayment, showAllBookPurchased
} from '../controller/userController.js'

router.get('/allbooks', viewAllBooks)
    .post('/register', register)
    .post('/login', login)
    .get('/search', searchBooks)
    .put('/addToCart', addBookToCart)
    .get('/viewcart/:id', viewCart)
    .delete('/clearcart/:id', clearCart)
    .post('/order/:id', placingOrder)
    .post('/payment/:id', makePayment)
    .get('/purchased/:id', showAllBookPurchased)



export default router