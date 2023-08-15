const db = require("../db");

// Create a "fruits" table if it doesn't exist
db.query(
  `CREATE TABLE IF NOT EXISTS fruits (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(50) NOT NULL
  )`,
  (err, result) => {
    if (err) {
      console.error('Error creating "fruits" table', err.stack);
    } else {
      console.log('Table "fruits" created successfully');
    }
  }
);

const addFruit = async (req, res) => {
  const { name, color } = req.body;

  if (!name || !color) {
    return res.status(400).json({ error: "Name and color are required." });
  }

  try {
    await db.query(`INSERT INTO fruits (name, color) VALUES ($1, $2)`, [
      name,
      color,
    ]);
    res.status(201).json({ message: "Fruit added successfully." });
  } catch (err) {
    console.error("Error inserting the fruit:", err.message);
    res.status(500).json({ error: "Error inserting the fruit." });
  }
};

const getAllFruits = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM fruits ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error retrieving fruits:", err.message);
    res
      .status(500)
      .json({ error: "Error retrieving fruits from the database." });
  }
};

const deleteAllFruits = async (req, res) => {
  try {
    const result = await db.query("DELETE FROM fruits");

    const rowCount = result.rowCount;
    res.json({ message: `Deleted ${rowCount} fruits.` });
  } catch (err) {
    console.error("Error deleting fruits:", err.message);
    res.status(500).json({ error: "Failed to delete fruits." });
  }
};

const deleteFruit = async (req, res) => {
  const fruitId = req.params.id;

  try {
    const result = await db.query("DELETE FROM fruits WHERE id = $1", [
      fruitId,
    ]);
    const rowCount = result.rowCount;

    if (rowCount === 0) {
      res.status(404).json({ error: "Fruit not found." });
    } else {
      res.json({ message: "Fruit deleted successfully." });
    }
  } catch (err) {
    console.error("Error deleting the fruit:", err.message);
    res.status(500).json({ error: "Failed to delete the fruit." });
  }
};

const updateFruit = async (req, res) => {
  const fruitId = req.params.id;
  const { name, color } = req.body;

  try {
    const result = await db.query(
      "UPDATE fruits SET name = $1, color = $2 WHERE id = $3",
      [name, color, fruitId]
    );

    const rowCount = result.rowCount;

    if (rowCount === 0) {
      res.status(404).json({ error: "Fruit not found." });
    } else {
      res.json({ message: "Fruit updated successfully." });
    }
  } catch (err) {
    console.error("Error updating the fruit:", err.message);
    res.status(500).json({ error: "Failed to update the fruit." });
  }
};

module.exports = {
  addFruit,
  getAllFruits,
  deleteAllFruits,
  deleteFruit,
  updateFruit,
};
