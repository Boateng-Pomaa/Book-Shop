import express from 'express'
const router = express.Router()
import { check } from 'express-validator'
import { register, login, viewAllBooks, searchBooks,addBookToCart, viewCart,clearCart } from '../controller/userController.js'

router.get('/all/books', viewAllBooks)
    .post('/user/register', register)
    .post('/user/login', login)
    .get('/user/search',searchBooks)
    .post('user/addToCart',addBookToCart)
    .get('/user/viewcart:userId',viewCart)
    .delete('/user/clearcart:userId',clearCart)