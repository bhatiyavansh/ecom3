import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes.js";

// Load environment variables from the .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
}));
app.use(express.json());

// Routes
app.use('/api', routes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
