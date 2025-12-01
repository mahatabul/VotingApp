const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/errorhandler");
const path = require("path");

require("dotenv").config();
app.use(express.json());

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// routes
const auth = require("./routes/auth");
const polls = require("./routes/polls");

app.use("/api/v1/auth", auth);
app.use("/api/v1/polls", polls);

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server is listening to port", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();