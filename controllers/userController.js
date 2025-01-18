exports.test = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      user: "This is a test request",
    },
  });
};
