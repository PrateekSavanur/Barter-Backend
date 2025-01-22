const express = require("express");
const {
  createTransaction,
  updateTransactionStatus,
  deleteTransaction,
  getTransactionsByUser,
  getTransactionById,
} = require("../controllers/transactionController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.get("/", protect, getTransactionsByUser);
router.get("/:id", protect, getTransactionById);
router.post("/create", protect, createTransaction);
router.patch("/update/:id", protect, updateTransactionStatus);
router.delete("/delete/:id", protect, deleteTransaction);

module.exports = router;
