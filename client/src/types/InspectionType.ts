export type UserType = {
  idinspection?: number;
  inspector_name: string;
  fruit: string;
};

export type PreInspectionType = {
  idinspection?: number;
  inspection_date: string;
  container: string;
  exporter: string;
  importer: string;
  vessel: string;
  arrival_date: string | null;
  o2_level_percent: number;
  co2_level_percent: number;
  pulp_temp_c: number;
  atmosphere: string;
  etd: string | null;
};

export type QcInspectionType = {
  int_pallet_nr: number;
  pallet_number: string;
  caliber: string;
  box_net_weight_g?: number;
  grower: string;
  grw_boxes_per_pallet: number;
  total_boxes_per_pallet: number;
  packing_date?: string | null;
  peduncular_mold?: number;
  decay?: number;
  soft?: number;
  dehydrated?: number;
  cold_damage?: number;
  bruises?: number;
  open_injury?: number;
  scissor_damage?: number;
  russet_greater_than_4_cm?: number;
  insect_damage?: number;
  sunburn?: number;
  deformed?: number;
  inspected_boxes: number;
};
