const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const diagnosisRoutes = require("./routes/diagnosis");

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

mongoose
  .connect("mongodb://localhost:27017/kisaan")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("🚀 AgroCare Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/diagnosis", diagnosisRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});