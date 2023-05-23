import { bookModel } from '../models/booksSchema.js'
import { userModel } from '../models/userSchema.js'
import { cartModel } from '../models/cartSchema.js'
import { orderModel } from '../models/orderSchema.js'
import bcrypt from 'bcrypt'
import { response } from 'express'





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
      username,
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
export async function viewAllBooks(req, res) {
  try {
    const books = await bookModel.find()

    if (!books) {
      res.status(404).send("Couldnt fetch data")
    }
    res.status(200).json({ books })

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
    console.log(keyword)
    const books = await bookModel.find({
      $or: [
        { title: { $regex: `${keyword}`, $options: 'i' } },
        { description: { $regex: `${keyword}`, $options: 'i' } },
        { author: { $regex: `${keyword}`, $options: 'i' } }
      ]
    })

    if (!books) {
      res.status(400).send("Unable to fetch data")
    }
    res.status(200).json({ books })
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

    const { user, books, quantity } = req.body

    console.log(user, books, quantity)
    const result = await cartModel.updateOne(
      { user: user },
      { $addToSet: { books: books, quantity: quantity } },
      { upsert: true }
    )
    if (!result) {
      res.status(400).send('Couldnt add book to cart')

    }
    res.status(200).send('Book added to cart successfully')

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
    const { id } = req.params
    console.log(id)
    const cart = await cartModel.findOne({ user: id }).populate({
      path: 'books',
      select: '-description -quantity -createdAt -updatedAt'
    })
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
export async function clearCart(req, res) {
  try {
    const { id } = req.params
    console.log(id)
    const result = await cartModel.updateOne(
      { user: id },
      { $set: { books: [], quantity: 0 } }
    )
    if (!result) {
      return res.status(400).send('No cart found')
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

function calculateOrder(books) {
  let totalAmount = 0
  for (const book of books) {
    totalAmount += book.price
  }
  return totalAmount
}
export async function placingOrder(req, res) {
  try {
    const { id } = req.params
    console.log(id)
    const cart = await cartModel.findOne({ user: id }).populate({
      path: 'books',
      select: '-description -quantity -createdAt -updatedAt'
    })

    if (!cart || cart.books.length === 0) {
      return res.status(400).send('Cart is empty')
    }

    const totalAmount = calculateOrder(cart.books)

    const order = orderModel.create({
      user: id,
      books: cart.books,
      amount: totalAmount,
      address: req.body.address
    })
    if (!order) {
      res.status(404).send('Order not successful')
    }
    res.status(200).send('Order placed successfully')

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

///making payments
export async function makePayment(req, res) {
  try {
    const { payment } = req.body
    const { id } = req.params
    console.log(payment)
    const paid = await orderModel.updateOne({ user: id }, { $set: { payment, status: 'paid' } })

    if(!paid){
      res.status(404).send("failed to make payment")
    }else{
      await cartModel.updateOne(
        { user: id },
        { $set: { books: [], quantity: 0 } }
      )
      res.status(200).send('Payment successful')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }

}


//book purchased
export async function showAllBookPurchased(req, res) {
  try {
    const {id} = req.params
    const purchased = await orderModel.findOne({user:id,status:'paid'}).populate('books','title')
    if(!purchased){
      res.status(404).send('No Books Purchased')
    }
    res.status(200).json({purchased})
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}