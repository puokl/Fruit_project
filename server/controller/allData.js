const db = require("../db");

const getAllLatestData = async (req, res) => {
  try {
    const latestTest1 = await db.query(
      `SELECT * FROM inspection_id ORDER BY idinspection DESC LIMIT 1`
    );

    const latestTest2 = await db.query(
      `SELECT * FROM pre_inspection ORDER BY idinspection DESC LIMIT 1`
    );

    const latestTest3 = await db.query(
      `SELECT * FROM qc_inspection ORDER BY idinspection DESC LIMIT 1`
    );

    const latestData = {
      test1: latestTest1.rows[0],
      test2: latestTest2.rows[0],
      test3: latestTest3.rows[0],
    };

    res.status(200).json(latestData);
  } catch (err) {
    console.error("Error fetching latest data:", err.message);
    res.status(500).json({ error: "Error fetching latest data." });
  }
};

const deleteLatestData = async (req, res) => {
  try {
    const latestTest1 = await db.query(
      `SELECT * FROM inspection_id ORDER BY idinspection DESC LIMIT 1`
    );

    const latestId = latestTest1.rows[0].idinspection;

    await db.query(`DELETE FROM inspection_id WHERE idinspection = $1`, [
      latestId,
    ]);
    await db.query(`DELETE FROM pre_inspection WHERE idinspection = $1`, [
      latestId,
    ]);
    await db.query(`DELETE FROM qc_inspection WHERE idinspection = $1`, [
      latestId,
    ]);

    res.status(200).json({ message: "Latest data deleted successfully." });
  } catch (err) {
    console.error("Error deleting latest data:", err.message);
    res.status(500).json({ error: "Error deleting latest data." });
  }
};

const getSpecificRowData = async (req, res) => {
  const rowNumber = req.params.id; // Assuming you're passing this in the URL parameter

  try {
    const specificTest1 = await db.query(
      `SELECT * FROM inspection_id OFFSET $1 LIMIT 1`,
      [rowNumber - 1] // Adjust row number to match zero-based indexing
    );
    console.log("fispecificTest1rst", specificTest1);
    const specificTest2 = await db.query(
      `SELECT * FROM pre_inspection OFFSET $1 LIMIT 1`,
      [rowNumber - 1]
    );

    const specificTest3 = await db.query(
      `SELECT * FROM qc_inspection OFFSET $1 LIMIT 1`,
      [rowNumber - 1]
    );

    const specificRowData = {
      test1: specificTest1.rows[0],
      test2: specificTest2.rows[0],
      test3: specificTest3.rows[0],
    };

    res.status(200).json(specificRowData);
  } catch (err) {
    console.error("Error fetching specific row data:", err.message);
    res.status(500).json({ error: "Error fetching specific row data." });
  }
};

module.exports = {
  getAllLatestData,
  deleteLatestData,
  getSpecificRowData,
};
