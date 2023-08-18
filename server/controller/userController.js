const db = require("../db");

// Create a "users" table if it doesn't exist
db.query(
  `CREATE TABLE IF NOT EXISTS inspection_id (
    idinspection SERIAL PRIMARY KEY,
    inspector_name VARCHAR(30) NOT NULL,
    fruit VARCHAR(20) NOT NULL
  )`,
  (err, result) => {
    if (err) {
      console.error('Error creating "inspection_id" table', err.stack);
    } else {
      console.log('Table "inspection_id" created successfully');
    }
  }
);

const addUser = async (req, res) => {
  const { inspector_name, fruit } = req.body;

  console.log("req.body", req.body);
  if (!inspector_name || !fruit) {
    return res.status(400).json({
      error: "Invalid data. Please provide inspector_name and a valid fruit.",
    });
  }

  try {
    await db.query(
      `INSERT INTO inspection_id (inspector_name, fruit) VALUES ($1, $2)`,
      [inspector_name, fruit]
    );
    res.status(201).json({ message: "User added successfully." });
  } catch (err) {
    console.error("Error inserting the user:", err.message);
    res.status(500).json({ error: "Error inserting the user." });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const queryResult = await db.query("SELECT * FROM inspection_id");
    const users = queryResult.rows;
    res.status(200).json(users);
  } catch (err) {
    console.error("Error retrieving users:", err.message);
    res.status(500).json({ error: "Failed to retrieve users." });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await db.query("DELETE FROM inspection_id");
    res.status(200).json({ message: "All users deleted successfully." });
  } catch (err) {
    console.error("Error deleting users:", err.message);
    res.status(500).json({ error: "Failed to delete users." });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  deleteAllUsers,
};
