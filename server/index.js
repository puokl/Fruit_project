const express = require("express");
const db = require("./db");
const app = express();

const {
  deleteFruit,
  getAllFruits,
  addFruit,
  deleteAllFruits,
  updateFruit,
} = require("./controller/fruitsController");

app.use(express.json());

app.post("/fruits", addFruit);
app.get("/getAll", getAllFruits);
app.delete("/deleteall", deleteAllFruits);
app.delete("/fruits/:id", deleteFruit);
app.put("/fruits/:id", updateFruit);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
