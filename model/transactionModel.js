const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    initiator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user initiating the barter
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the other user involved in the barter
      required: true,
    },
    initiatorItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item", // Reference to the item offered by the initiator
      required: true,
    },
    recipientItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item", // Reference to the item offered by the recipient
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Completed", "Cancelled"],
      default: "Pending",
    },
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
