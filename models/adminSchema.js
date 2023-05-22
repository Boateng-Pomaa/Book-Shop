import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const {Schema,model} = mongoose
const adminSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select:true
    }
},
{
  timestamps:true
}
)

adminSchema.pre("save", function (next) {
    const admin = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(admin.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            admin.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })


export const adminModel = model('admin',adminSchema)