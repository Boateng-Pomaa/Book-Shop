import {userModel} from '../models/userSchema.js'
import bcrypt from 'bcrypt'






export async function register(req,res){
    try {
        const {username, password} =req.body


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

export  async function login(req, res) {
  try {
    const {username, password} = req.body
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
