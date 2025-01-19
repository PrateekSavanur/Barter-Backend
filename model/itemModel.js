const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide an item name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide an item description"],
    },
    category: {
      type: String,
      required: [true, "Please specify the category"],
      enum: [
        "Electronics",
        "Books",
        "Clothing",
        "Furniture",
        "Appliances",
        "Toys",
        "Sports",
        "Others",
      ],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    condition: {
      type: String,
      enum: ["New", "Like New", "Used", "For Parts"],
      default: "Used",
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
    availableForTrade: {
      type: Boolean,
      default: true,
    },
    desiredItems: {
      type: [String],
    },
    tradeRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
