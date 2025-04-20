const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// ✅ Allow CORS from your frontend domain
app.use(cors({
  origin: "https://tarzanaportal.xyz/trz"
}));

app.use(express.urlencoded({ extended: true }));

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzD-gU_bk0XqZsI5N7v6EMhNYt-CXDtB38CAoI7pp-MP19KntKZkL3BiT--Sc0Zr3g-/exec";

// 👇 Your POST endpoint
app.post("/generate", async (req, res) => {
  try {
    const response = await axios.post(
      SCRIPT_URL,
      new URLSearchParams(req.body).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("✅ Railway Proxy is Live!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
