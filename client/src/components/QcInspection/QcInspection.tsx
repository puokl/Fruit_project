import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Spacer,
  NumberInput,
  NumberInputField,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";

type FormValues = {
  pallet_number: string;
  caliber: string;
  box_net_weight_g?: number;
  grower: string;
  grw_boxes_per_pallet: number;
  total_boxes_per_pallet: number;
  packing_date?: string;
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

function parseAndCheckNaN(value: string | number | undefined): number {
  const parsedValue = parseFloat(value?.toString() || "");
  return isNaN(parsedValue) ? 0 : parsedValue;
}

const formControls = [
  {
    label: "Pallet Number",
    name: "pallet_number",
    type: "text",
    required: true,
  },
  { label: "Caliber", name: "caliber", type: "text", required: true },
  { label: "Box Net Weight (g)", name: "box_net_weight_g", type: "number" },
  { label: "Grower", name: "grower", type: "text", required: true },
  {
    label: "Grower Boxes per Pallet",
    name: "grw_boxes_per_pallet",
    type: "number",
    required: true,
  },
  {
    label: "Total Boxes per Pallet",
    name: "total_boxes_per_pallet",
    type: "number",
    required: true,
  },
  { label: "Packing Date", name: "packing_date", type: "date" },
  { label: "Peduncular Mold", name: "peduncular_mold", type: "number" },
  { label: "Decay", name: "decay", type: "number" },
  { label: "Soft", name: "soft", type: "number" },
  { label: "Dehydrated", name: "dehydrated", type: "number" },
  { label: "Cold Damage", name: "cold_damage", type: "number" },
  { label: "Bruises", name: "bruises", type: "number" },
  { label: "Open Injury", name: "open_injury", type: "number" },
  { label: "Scissor Damage", name: "scissor_damage", type: "number" },
  {
    label: "Russet > 4 cm",
    name: "russet_greater_than_4_cm",
    type: "number",
  },
  { label: "Insect Damage", name: "insect_damage", type: "number" },
  { label: "Sunburn", name: "sunburn", type: "number" },
  { label: "Deformed", name: "deformed", type: "number" },
  {
    label: "Inspected Boxes",
    name: "inspected_boxes",
    type: "number",
    required: true,
  },
];

const QcInspection: React.FC = () => {
  // function QcInspection() {

  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  console.log("isLoading", isLoading);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    data.box_net_weight_g = parseAndCheckNaN(data.box_net_weight_g);
    data.grw_boxes_per_pallet = parseAndCheckNaN(data.grw_boxes_per_pallet);
    data.total_boxes_per_pallet = parseAndCheckNaN(data.total_boxes_per_pallet);
    data.peduncular_mold = parseAndCheckNaN(data.peduncular_mold);
    data.decay = parseAndCheckNaN(data.decay);
    data.soft = parseAndCheckNaN(data.soft);
    data.dehydrated = parseAndCheckNaN(data.dehydrated);
    data.cold_damage = parseAndCheckNaN(data.cold_damage);
    data.bruises = parseAndCheckNaN(data.bruises);
    data.open_injury = parseAndCheckNaN(data.open_injury);
    data.scissor_damage = parseAndCheckNaN(data.scissor_damage);
    data.russet_greater_than_4_cm = parseAndCheckNaN(
      data.russet_greater_than_4_cm
    );
    data.insect_damage = parseAndCheckNaN(data.insect_damage);
    data.sunburn = parseAndCheckNaN(data.sunburn);
    data.deformed = parseAndCheckNaN(data.deformed);
    data.inspected_boxes = parseAndCheckNaN(data.inspected_boxes);

    // Handle form submission here
    console.log(data);
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/api/qcinspection`,
        data
      );
      setMessage("Inspection added successfully.");
    } catch (error: any) {
      console.error("Error:", error);
      console.log("errors", errors);
      setMessage("Failed to add inspection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      maxW={isMobile ? "100%" : "40vw"}
      mx={isMobile ? 20 : "auto"}
      textAlign="center"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          {formControls.map((control) => (
            <FormControl key={control.name} isRequired={control.required}>
              <FormLabel>{control.label}</FormLabel>
              {control.type === "number" ? (
                <NumberInput>
                  <NumberInputField
                    {...register(control.name as keyof FormValues)}
                  />
                </NumberInput>
              ) : (
                <Input
                  type={control.type}
                  {...register(control.name as keyof FormValues)}
                />
              )}
              {errors[control.name as keyof FormValues] && (
                <span>{`${control.label} is required`}</span>
              )}
            </FormControl>
          ))}
        </VStack>

        <Spacer height={4} />

        <Button type="submit">Submit</Button>
      </form>
      {message && <p>{message}</p>}
      <Link to="../">
        <Button>To Homepage</Button>
      </Link>
      <Link to="../getall">
        <Button>check data</Button>
      </Link>
    </Box>
  );
};

export default QcInspection;
