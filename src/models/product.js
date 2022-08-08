const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    parentID: {
      type: String,
    },
    price: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
    offer: { type: Number },
    productPictures: [{ img: { type: String } }],
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectedId, ref: "User" },
        review: String,
      },
    ],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: momgoose.Schema.Types.ObjectId, ref: "User" },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
