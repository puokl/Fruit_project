const db = require("../db");

// Create a "inspections" table if it doesn't exist
db.query(
  `CREATE TABLE IF NOT EXISTS test_3 (
    idinspection INTEGER REFERENCES test_1(idinspection),
    int_pallet_nr SERIAL PRIMARY KEY,
    pallet_number VARCHAR(25) NOT NULL,
    caliber VARCHAR(10) NOT NULL,
    box_net_weight_g INTEGER,
    grower VARCHAR(30) NOT NULL,
    grw_boxes_per_pallet SMALLINT NOT NULL,
    total_boxes_per_pallet SMALLINT NOT NULL,
    packing_date DATE,
    peduncular_mold SMALLINT,
    decay SMALLINT,
    soft SMALLINT,
    dehydrated SMALLINT,
    cold_damage SMALLINT,
    bruises SMALLINT,
    open_injury SMALLINT,
    scissor_damage SMALLINT,
    russet_greater_than_4_cm SMALLINT,
    insect_damage SMALLINT,
    sunburn SMALLINT,
    deformed SMALLINT,
    inspected_boxes SMALLINT NOT NULL
  )`,
  (err, result) => {
    if (err) {
      console.error('Error creating "qc_inspection" table', err.stack);
    } else {
      console.log('Table "qc_inspection" created successfully');
    }
  }
);

const addQCInspection = async (req, res) => {
  const {
    pallet_number,
    caliber,
    box_net_weight_g,
    grower,
    grw_boxes_per_pallet,
    total_boxes_per_pallet,
    packing_date,
    peduncular_mold,
    decay,
    soft,
    dehydrated,
    cold_damage,
    bruises,
    open_injury,
    scissor_damage,
    russet_greater_than_4_cm,
    insect_damage,
    sunburn,
    deformed,
    inspected_boxes,
  } = req.body;

  console.log("req.body", req.body);
  if (
    !pallet_number ||
    !caliber ||
    !grower ||
    !grw_boxes_per_pallet ||
    !total_boxes_per_pallet ||
    !inspected_boxes
  ) {
    return res.status(400).json({
      error: "Invalid data. Please provide required fields.",
    });
  }

  try {
    await db.query(
      `INSERT INTO test_3 (
        idinspection,
        pallet_number,
        caliber,
        box_net_weight_g,
        grower,
        grw_boxes_per_pallet,
        total_boxes_per_pallet,
        packing_date,
        peduncular_mold,
        decay,
        soft,
        dehydrated,
        cold_damage,
        bruises,
        open_injury,
        scissor_damage,
        russet_greater_than_4_cm,
        insect_damage,
        sunburn,
        deformed,
        inspected_boxes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)`,
      [
        idinspection,
        pallet_number,
        caliber,
        box_net_weight_g,
        grower,
        grw_boxes_per_pallet,
        total_boxes_per_pallet,
        packing_date,
        peduncular_mold,
        decay,
        soft,
        dehydrated,
        cold_damage,
        bruises,
        open_injury,
        scissor_damage,
        russet_greater_than_4_cm,
        insect_damage,
        sunburn,
        deformed,
        inspected_boxes,
      ]
    );
    res.status(201).json({ message: "Inspection added successfully." });
  } catch (err) {
    console.error("Error inserting the inspection:", err.message);
    res.status(500).json({ error: "Error inserting the inspection." });
  }
};

module.exports = {
  addQCInspection,
};
