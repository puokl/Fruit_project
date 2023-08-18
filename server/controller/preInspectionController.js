const db = require("../db");

// Create a "inspections" table if it doesn't exist
db.query(
  `CREATE TABLE IF NOT EXISTS pre_inspection (
    idinspection SERIAL PRIMARY KEY,
    inspection_date DATE NOT NULL,
    container VARCHAR(20) NOT NULL,
    exporter VARCHAR(20) NOT NULL,
    importer VARCHAR(20) NOT NULL,
    vessel VARCHAR(20),
    arrival_date DATE,
    o2_level_percent DECIMAL(2, 1),
    co2_level_percent DECIMAL(2, 1),
    pulp_temp_c DECIMAL(2, 1),
    atmosphere VARCHAR(20),
    etd DATE
  )`,
  (err, result) => {
    if (err) {
      console.error('Error creating "pre_inspection" table', err.stack);
    } else {
      console.log('Table "pre_inspection" created successfully');
    }
  }
);

const addPreInspection = async (req, res) => {
  const {
    inspection_date,
    container,
    exporter,
    importer,
    vessel,
    arrival_date,
    o2_level_percent,
    co2_level_percent,
    pulp_temp_c,
    atmosphere,
    etd,
  } = req.body;

  console.log("req.body", req.body);
  if (!inspection_date || !container || !exporter || !importer || !atmosphere) {
    return res.status(400).json({
      error: "Invalid data. Please provide required fields.",
    });
  }

  try {
    await db.query(
      `INSERT INTO pre_inspection (
        inspection_date,
        container,
        exporter,
        importer,
        vessel,
        arrival_date,
        o2_level_percent,
        co2_level_percent,
        pulp_temp_c,
        atmosphere,
        etd
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        inspection_date,
        container,
        exporter,
        importer,
        vessel,
        arrival_date,
        o2_level_percent,
        co2_level_percent,
        pulp_temp_c,
        atmosphere,
        etd,
      ]
    );
    res.status(201).json({ message: "Inspection added successfully." });
  } catch (err) {
    console.error("Error inserting the inspection:", err.message);
    res.status(500).json({ error: "Error inserting the inspection." });
  }
};

const getLastPreInspection = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM pre_inspection ORDER BY inspection_date DESC LIMIT 1`
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No inspections found." });
    }

    const lastInspection = result.rows[0];
    res.status(200).json(lastInspection);
  } catch (err) {
    console.error("Error fetching the last inspection:", err.message);
    res.status(500).json({ error: "Error fetching the last inspection." });
  }
};

module.exports = {
  addPreInspection,
  getLastPreInspection,
};
