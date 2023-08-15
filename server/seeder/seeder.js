const fs = require("fs");
const csvParser = require("csv-parser");
const { Client } = require("pg");
const db = require("../db");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const batchSize = 5; // Number of rows to insert in each batch
const csvFilePath = "./seeder/db.csv";

(async () => {
  const dataBatch = [];
  let rowCount = 0;

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on("data", (row) => {
      dataBatch.push(row);
      rowCount++;

      if (dataBatch.length === batchSize) {
        processBatch(dataBatch)
          .then(() => {
            dataBatch.length = 0; // Clear the batch
            console.log(`Inserted ${rowCount} rows.`);
          })
          .catch((error) => {
            console.error("Error inserting batch:", error);
          });
      }
    })
    .on("end", async () => {
      // Insert any remaining rows in the last batch
      if (dataBatch.length > 0) {
        try {
          await processBatch(dataBatch);
        } catch (error) {
          console.error("Error inserting batch:", error);
        }
        console.log(`Inserted ${rowCount} rows.`);
      }

      console.log("CSV parsing and insertion completed.");
    });
})();

async function processBatch(batch) {
  const client = await db.connect();

  try {
    for (const row of batch) {
      await insertRow(client, row);
    }
  } finally {
    client.release();
  }
}

async function insertRow(client, row) {
  function parseNumber(value) {
    if (value !== undefined) {
      return value.trim() === "" ? 0 : parseFloat(value);
    }
    return 0;
  }
  const inspectionIdQuery = {
    text: `INSERT INTO inspection_id (inspector_name, fruit) VALUES ($1, $2) RETURNING idinspection`,
    values: [row.inspector_name, row.fruit],
  };

  console.log("inspectionIdQuery", inspectionIdQuery);
  const inspectionIdResult = await client.query(inspectionIdQuery);

  const preInspectionQuery = {
    text: `INSERT INTO pre_inspection (idinspection, inspection_date, container, exporter, importer, vessel, arrival_date, o2_level_percent, co2_level_percent, pulp_temp_c, atmosphere, etd) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    values: [
      inspectionIdResult.rows[0].idinspection,
      row.inspection_date,
      row.container,
      row.exporter,
      row.importer,
      row.vessel,
      row.arrival_date,
      parseNumber(row.o2_level_percent),
      parseNumber(row.co2_level_percent),
      parseNumber(row.pulp_temp_c),
      row.atmosphere,
      row.etd,
    ],
  };
  console.log("preInspectionQuery", preInspectionQuery);

  const qcInspectionQuery = {
    text: `INSERT INTO qc_inspection (idinspection, int_pallet_nr, pallet_number, caliber, box_net_weight_g, grower, grw_boxes_per_pallet, total_boxes_per_pallet, packing_date, peduncular_mold, decay, soft, dehydrated, cold_damage, bruises, open_injury, scissor_damage, russet_greater_than_4_cm, insect_damage, sunburn, deformed, inspected_boxes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`,
    values: [
      inspectionIdResult.rows[0].idinspection,
      row.int_pallet_nr,
      row.pallet_number,
      row.caliber,
      parseInt(row.box_net_weight_g),
      row.grower,
      parseInt(row.grw_boxes_per_pallet),
      parseInt(row.total_boxes_per_pallet),
      row.packing_date,
      parseNumber(row.peduncular_mold),
      parseNumber(row.decay),
      parseNumber(row.soft),
      parseNumber(row.dehydrated),
      parseNumber(row.cold_damage),
      parseNumber(row.bruises),
      parseNumber(row.open_injury),
      parseNumber(row.scissor_damage),
      parseNumber(row.russet_greater_than_4_cm),
      parseNumber(row.insect_damage),
      parseNumber(row.sunburn),
      parseNumber(row.deformed),
      parseNumber(row.inspected_boxes),
    ],
  };

  console.log("qcInspectionQuery", qcInspectionQuery);

  await client.query(preInspectionQuery);
  await client.query(qcInspectionQuery);

  console.log("Row inserted into tables.");
}
