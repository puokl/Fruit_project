const express = require("express");
const db = require("./db");
const app = express();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const {
  deleteFruit,
  getAllFruits,
  addFruit,
  deleteAllFruits,
  updateFruit,
} = require("./controller/fruitsController");
const {
  addUser,
  deleteAllUsers,
  getAllUsers,
} = require("./controller/userController");
const {
  addInspection,
  // deleteTable,
} = require("./controller/preInspectionController");

app.use(express.json());
app.use(helmet());
app.use(cors());

// 100 requests per hour
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,
});

app.use(limiter);

app.post("/api/fruits", addFruit);
app.get("/api/fruits", getAllFruits);
app.delete("/api/fruits", deleteAllFruits);
app.delete("/api/fruits/:id", deleteFruit);
app.put("/api/fruits/:id", updateFruit);

app.post("/api/users", addUser);
app.get("/api/users", getAllUsers);

app.delete("/api/users", deleteAllUsers);

app.post("/api/preinspection", addInspection);
// app.delete("/api/delete", deleteTable);

//SECTION -

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
