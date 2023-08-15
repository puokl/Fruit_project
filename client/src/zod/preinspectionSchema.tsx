import { z } from "zod";

const preinspectionSchema = z.object({
  inspection_date: z.string(),
  container: z.string(),
  exporter: z.string(),
  importer: z.string(),
  vessel: z.string().optional(),
  arrival_date: z.string().nullable(),
  o2_level_percent: z.number().min(0).max(100),
  co2_level_percent: z.number().min(0).max(100).optional(),
  pulp_temp_c: z.number().optional(),
  atmosphere: z.string(),
  etd: z.string().nullable(),
});

export default preinspectionSchema;
