const express = require("express");
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");
const { protect } = require("../controllers/authController");
const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getItemById);

// Protected
router.post("/create", protect, createItem);
router.patch("/update/:id", protect, updateItem);
router.delete("/delete/:id", protect, deleteItem);

module.exports = router;
