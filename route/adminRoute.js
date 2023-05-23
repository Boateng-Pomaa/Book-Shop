import express from 'express'
const router = express.Router()
import { check } from 'express-validator'
import upload from '../middleware/upload.js'
import { adminLogin, uploadFile, updateBook, deleteBook ,viewOrders} from '../controller/adminController.js'

router.post('/login/admin', [
    check("A valid password is required").isLength({ min: 4 })
], adminLogin)
    .post('/add/book', upload.single('file'), uploadFile)
    .patch('/editbook/:Title', upload.single('file'), updateBook)
    .delete('/delete/:title', deleteBook)
    .get('/allorders',viewOrders)

export default router
