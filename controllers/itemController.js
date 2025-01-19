const Item = require("../model/itemModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const getAllItems = catchAsync(async (req, res) => {
  const items = await Item.find().populate("owner", "name email location");
  res.status(200).json(items);
});

const getItemById = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate(
    "owner",
    "name email location"
  );
  if (!item) {
    return next(new AppError("Item not Found", 404));
  }
  res.status(200).json({
    status: "success",
    item,
  });
});

const createItem = catchAsync(async (req, res, next) => {
  const {
    name,
    description,
    category,
    location,
    condition,
    images,
    desiredItems,
  } = req.body;

  const newItem = await Item.create({
    name,
    description,
    category,
    location,
    condition,
    images,
    desiredItems,
    owner: req.user._id,
  });

  res.status(201).json({
    status: "success",
    item: newItem,
  });
});

const updateItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(new AppError("Item not Found", 404));
  }

  // Check if the user owns the item
  if (item.owner.toString() !== req.user._id.toString()) {
    return next(new AppError("Not authorized to change this item", 403));
  }

  // Update fields
  Object.assign(item, req.body);
  const updatedItem = await item.save();

  res.status(200).json({
    status: "success",
    item: updatedItem,
  });
});

const deleteItem = catchAsync(async (req, res, next) => {
  const item = await Item.findByIdAndDelete(req.params.id);

  if (!item) {
    return next(new AppError("Item not Found", 404));
  }

  // Check if the user owns the item
  if (item.owner.toString() !== req.user._id.toString()) {
    return next(new AppError("Not authorized to delete this item", 403));
  }

  res
    .status(200)
    .json({ status: "succcess", message: "Item deleted successfully" });
});

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
