const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

// Define CORS options
const corsOptions = {
  origin: "https://bayesian-tech-client.vercel.app/", // Replace with your frontend domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions)); // Enable CORS with options
app.use(express.json());

app.post("/proxy", async (req, res) => {
  try {
    const { url, method, data, headers } = req.body;
    console.log("Request Body:", req.body); // Log the incoming request body

    const response = await axios({
      url,
      method,
      data,
      headers: {
        ...headers,
        "User-Agent": "YourCustomUserAgent",
      },
    });

    console.log("Response Data:", response.data); // Log the response data
    res.json(response.data);
  } catch (error) {
    console.error("Error occurred while processing request:", error.message); // Log the error message
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
