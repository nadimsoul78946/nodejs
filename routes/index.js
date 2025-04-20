const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// 👇 THIS is the endpoint your frontend is calling
app.post("/generate", async (req, res) => {
  try {
    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycbzD-gU_bk0XqZsI5N7v6EMhNYt-CXDtB38CAoI7pp-MP19KntKZkL3BiT--Sc0Zr3g-/exec",
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

app.get("/", (req, res) => {
  res.send("✅ Railway Proxy is Live!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
