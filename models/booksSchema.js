import mongoose from "mongoose"

const {Schema,model} = mongoose


const bookSchema = new Schema(
    {
      title: {
        type: String,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
      picture_path: {
            type:String,
            required:true
        },
      quantity: {
        type: Number,
        default: 0
      }
    },
    {
      timestamps: true
    }
  )


  export const bookModel = model("books",bookSchema)