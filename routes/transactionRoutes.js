const express = require("express");
const {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransactionStatus,
  deleteTransaction,
} = require("../controllers/transactionController");
const { protect } = require("../controllers/authController");

const router = express.Router();

// router.get("/", protect, getAllTransactions);
router.get("/:id", protect, getTransactionById);
router.post("/create", protect, createTransaction);
router.patch("/update/:id", protect, updateTransactionStatus);
router.delete("/delete/:id", protect, deleteTransaction);

module.exports = router;
