import mongoose from "mongoose"

const { Schema, model } = mongoose


const bookSchema = new Schema(
  {
    title: {
      type: String,
      trim: true
    },
    author: {
      type: String
    },
    description: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      required:true
    },
    picture_path: {
      type: String,
      required: true
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


export const bookModel = model("books", bookSchema)