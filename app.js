const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const itemRouter = require("./routes/itemRoutes");
const userRouter = require("./routes/userRoutes");
const transactionRouter = require("./routes/transactionRoutes");

const app = express();

const allowedOrigins = [
  "https://barter-backend-five.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Development logging
if (!process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Trust the proxy for accurate IP identification
app.set("trust proxy", 1);

// Set security http headers
app.use(helmet());

// Limit requests
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests. Please try again in an hour",
});

app.use("/api", limiter);

// Body parser, reading data from body to req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.static(`${__dirname}/public`));

// Data sanitization against nosql query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Prevent parameter pollution -> using multiple sorts in req
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// // Routing using middleware
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", transactionRouter);

// Handling non specified urls
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server `, 404));
});

//Global error handling middleware

app.use(globalErrorHandler);

module.exports = app;

// All the middlewares with err in their
// next will be sent to global error handling middleware
