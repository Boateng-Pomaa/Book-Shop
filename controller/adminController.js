import { adminModel } from '../models/adminSchema.js'
import { bookModel } from '../models/booksSchema.js'
import bcrypt from 'bcrypt'
import { orderModel } from '../models/orderSchema.js'



export async function adminLogin(req, res) {
    try {
        const { username, password } = req.body
        const user = await adminModel.findOne({ username })
        if (user && (await bcrypt.compare(password, user.password))) {

            res.status(200).json({
                message: "Logged in successful",
                user

            })

        } else {
            res.status(400).json({
                message: 'Invalid Credentials'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'server error'
        })

    }
}


export async function uploadFile(req, res) {
    try {
        const { title, description, price, quantity } = req.body
        const { path } = req.file
        const file = await bookModel.create({
            title,
            description,
            price,
            picture_path: path,
            quantity
        })
        if (file) {
            res.status(200).send('file uploaded successfully.')
            console.log('file uploaded successfully')
        } else {
            res.status(400).send('file upload failed')
            console.log('file upload failed')
        }
    }
    catch (error) {
        res.status(500).send('Error while uploading file.')
        console.log(error)
    }
}

///update

export async function updateBook(req, res) {
    try {
        const { title, description, quantity } = req.body
        const { Title } = req.params
        
        let Path
        // checking if new image is being added
        if (req.file) {
            Path = req.file.path
        }

        const bookExists = await bookModel.findOne({ title:Title })

        if (!bookExists) {
            res.status(400).send('Book not found')
        }

        const book = await bookModel.updateOne({ title:Title }, {
            $set: {
                title,
                description,
                picture_path: Path,
                quantity
            }
        })

        if (!book) {
            res.status(400).send('Error while updating book')
        }
        res.status(200).send({
            message: 'Book updated successfully'
        })

    } catch (error) {
        res.status(500).send('Error while updating book')
        console.log(error)
    }
}



//deleting
export async function deleteBook(req, res) {
    try {
        const { title } = req.params

        const deleted = await bookModel.findOneAndDelete({ title })
        if (!deleted) {
            res.status(400).send('Error while deleting book')
        }
        res.status(200).send({
            message: 'Book deleted successfully'
        })

    } catch (error) {
        res.status(500).send('Error while deleting book')
        console.log(error)
    }
}

// view list of orders
export async function viewOrders(req, res) {
    try {
        const orders = await orderModel.find()

        if(orders){
            res.status(200).send(orders)
        }
    } catch (error) {
        res.status(500).send('Error viewing orders')
        console.log(error)
    }
}