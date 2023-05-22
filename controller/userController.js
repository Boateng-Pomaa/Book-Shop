import { bookModel } from '../models/booksSchema.js'
import { userModel } from '../models/userSchema.js'
import {cartModel} from '../models/cartSchema.js'
import bcrypt from 'bcrypt'






export async function register(req, res) {
  try {
    const { username, password } = req.body


    // Validation
    if (!username || !password) {
      res.status(400).json({
        message: 'Please include all fields'
      })
    }
    // Find if user already exists
    const userExists = await userModel.findOne({ username })

    if (userExists) {
      res.status(400).send({
        message: 'User already exists'
      })
    }
    // CREATING USER

    const user = await userModel.create({
      email,
      password
    })
    if (user) {
      res.status(200).json({
        message: 'Registration Successful',
        user
      })


    } else {
      res.status(400).json({
        message: "Registration unsuccessful"
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}



//logging in

export async function login(req, res) {
  try {
    const { username, password } = req.body
    const user = await userModel.findOne({ username })
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
      message: 'Internal server error'
    })
  }
}


// view all books
export async function viewAllBooks() {
  try {
    const books = await bookModel.find()

    if (books) {
      res.status(200).json({ books })
    }
    res.status(404).send("Couldnt fetch data")
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}


//Searching for books
export async function searchBooks(req, res) {
  try {
    const { keyword } = req.query
    const books = await bookModel.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { author: { $regex: keyword, $options: 'i' } }
      ]
    })

    if(books){
      res.status(200).json({books})
    }
    res.status(400).send("Unable to fetch data")
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

//add books to cart
export async function addBookToCart(req, res) {
  try {
    const { userId, bookId } = req.body
    const result = await cartModel.updateOne(
      { user: userId },
      { $addToSet: { books: bookId } },
      { upsert: true }
    );

    if (result) {
      res.status(200).send('Book added to cart successfully')
    }

    res.status(400).send('Couldnt add book to cart')

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}


//view carts

export async function viewCart(req, res) {
  try {
    const { userId } = req.params
    const cart = await cartModel.findOne({ user: userId }).populate('books')

    if (!cart) {
      return res.status(400).send('Cart not found')
    }

    if (cart.books.length === 0) {
      return res.send('Cart is empty')
    }

    res.status(200).json(cart)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}


//clear cart
export async function clearCart(req,res) {
  try {
    const { userId } = req.params
    const result = await cartModel.updateOne(
      { user: userId },
      { $set: { books: [] } }
    )

    if (result.nModified === 0) {
      return res.status(404).send('No cart found')
    }
    res.status(200).send('Cart cleared successfully')

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}


///placing order
export async function placingOrder(req,res){
  try {
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}