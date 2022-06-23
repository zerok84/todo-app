const connection = require("./db");
const cors = require("cors");
const express = require("express");
const tasks = require("./routes/tasks");

// Create server
const app = express();

// Connect to MongoDB
connection();

// Use middleware functions
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/tasks", tasks);

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on PORT ${port}...`));
