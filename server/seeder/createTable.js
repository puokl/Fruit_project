const { Pool } = require("pg");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

(async () => {
  const client = await pool.connect();

  try {
    // // Create the Inspection_Id table
    await client.query(`
     CREATE TABLE IF NOT EXISTS inspection_id (
    idinspection SERIAL PRIMARY KEY,
    inspector_name VARCHAR(30) NOT NULL,
    fruit VARCHAR(20) NOT NULL
  );
    `);

    // Create the Pre_Inspection table
    await client.query(`
      CREATE TABLE IF NOT EXISTS pre_inspection (
  idinspection INTEGER REFERENCES inspection_id(idinspection),
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
  );
    `);

    // Create the QC_Inspection table
    await client.query(`
   CREATE TABLE IF NOT EXISTS qc_inspection (
  idinspection INTEGER REFERENCES inspection_id(idinspection),
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
);
    `);

    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    client.release();
    pool.end();
  }
})();
