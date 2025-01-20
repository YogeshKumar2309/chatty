// import express from "express";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { connectDB } from "./lib/db.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// dotenv.config();
// const app = express();

// const PORT = process.env.PORT;

// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use("/api/auth", authRoutes);
// app.use("/api/message", messageRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on PORT: ${PORT}`);
//   connectDB();
// });
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001; // Default port if not defined in .env

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true, // Allow cookies and credentials
  })
);

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Debug logs for route access
app.use("/api/auth", (req, res, next) => {
  console.log(`Auth route accessed: ${req.method} ${req.url}`);
  next();
});
app.use("/api/message", (req, res, next) => {
  console.log(`Message route accessed: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// Debugging the connection to the database
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.error("Database connection failed:", err);
    });
});

// Log server startup
console.log(`Server started at ${new Date().toISOString()}`);
