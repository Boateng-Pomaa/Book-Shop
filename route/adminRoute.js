import express from 'express'
const router = express.Router()
import { check } from 'express-validator'
import upload from '../middleware/upload.js'
import { isAdmin } from '../middleware/auth.js'
import { adminLogin, uploadFile, updateBook, deleteBook ,viewOrders} from '../controller/adminController.js'

router.post('/login/admin', [
    check("A valid password is required").isLength({ min: 4 })
], adminLogin)
    .post('/add/book',isAdmin, upload.single('file'), uploadFile)
    .patch('/editbook/:Title',isAdmin, upload.single('file'), updateBook)
    .delete('/delete/:title', isAdmin,deleteBook)
    .get('/allorders',isAdmin,viewOrders)

export default router
