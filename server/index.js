// server/index.js
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// CORS config so React (5173) can talk to Express (3001)
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Optional: log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`🛬 ${req.method} ${req.url}`);
  next();
});

// Mount user routes
app.use("/api/users", userRoutes);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🔥 Backend server running at http://localhost:${PORT}`);
});
