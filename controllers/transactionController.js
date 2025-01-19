const Transaction = require("../model/transactionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Get transaction by ID
const getTransactionById = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id).populate(
    "initiator recipient initiatorItem recipientItem"
  );

  if (!transaction) {
    return next(new AppError("Transaction not found", 404));
  }

  if (
    req.user._id.toString() !== transaction.initiator._id.toString() &&
    req.user._id.toString() !== transaction.recipient._id.toString()
  ) {
    return next(new AppError("Not authorized to view this transaction", 403));
  }

  res.status(200).json(transaction);
});

// Create a new transaction
const createTransaction = catchAsync(async (req, res, next) => {
  const {
    initiator,
    recipient,
    initiatorItem,
    recipientItem,
    status,
    messages,
  } = req.body;

  // Validate required fields
  if (!initiator || !recipient || !initiatorItem || !recipientItem) {
    return next(
      new AppError(
        "All fields (initiator, recipient, initiatorItem, recipientItem) are required.",
        400
      )
    );
  }

  // Create the transaction
  const newTransaction = await Transaction.create({
    initiator,
    recipient,
    initiatorItem,
    recipientItem,
    status: status || "Pending",
    messages: messages || [],
  });

  res.status(201).json({
    status: "success",
    data: {
      transaction: newTransaction,
    },
  });
});

// Update transaction status and add messages
const updateTransactionStatus = catchAsync(async (req, res, next) => {
  const { status, message } = req.body; // Destructure status and message from the request body
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(new AppError("Transaction not found", 404));
  }

  // Check if the user is either the initiator or the recipient
  if (
    req.user._id.toString() !== transaction.initiator.toString() &&
    req.user._id.toString() !== transaction.recipient.toString()
  ) {
    return next(new AppError("Not authorized to modify this transaction", 403));
  }

  // Update the status if provided
  if (status) {
    transaction.status = status;
  }

  // Add a new message to the messages array if provided
  if (message) {
    transaction.messages.push({
      sender: req.user._id, // The user making the request is the sender
      message,
    });
  }

  const updatedTransaction = await transaction.save();

  res.status(200).json({
    status: "success",
    data: updatedTransaction,
  });
});

// Delete transaction
const deleteTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(new AppError("Transaction not found", 404));
  }

  // Check if the user is either the initiator or recipient of the transaction
  if (
    req.user._id.toString() !== transaction.initiator.toString() &&
    req.user._id.toString() !== transaction.recipient.toString()
  ) {
    return next(new AppError("Not authorized to delete this transaction", 403));
  }

  // Delete the transaction
  await Transaction.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Transaction deleted successfully",
  });
});

module.exports = {
  getTransactionById,
  createTransaction,
  updateTransactionStatus,
  deleteTransaction,
};
