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
} from "@chakra-ui/react";

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

function QcInspection() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
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
  };

  return (
    <Box maxWidth="400px" margin="0 auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Pallet Number</FormLabel>
            <Input type="text" {...register("pallet_number")} />
            {errors.pallet_number && <span>Inspection date is required</span>}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Caliber</FormLabel>
            <Input type="text" {...register("caliber")} />
          </FormControl>

          <FormControl>
            <FormLabel>Box Net Weight (g)</FormLabel>
            <NumberInput>
              <NumberInputField {...register("box_net_weight_g")} />
            </NumberInput>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Grower</FormLabel>
            <Input type="text" {...register("grower")} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Grower Boxes per Pallet</FormLabel>
            <Input type="number" {...register("grw_boxes_per_pallet")} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Total Boxes per Pallet</FormLabel>
            <Input type="number" {...register("total_boxes_per_pallet")} />
          </FormControl>

          <FormControl>
            <FormLabel>Packing Date</FormLabel>
            <Input type="date" {...register("packing_date")} />
          </FormControl>

          <FormControl>
            <FormLabel>Decay</FormLabel>
            <NumberInput>
              <NumberInputField {...register("decay")} />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Soft</FormLabel>
            <NumberInput>
              <NumberInputField {...register("soft")} />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Dehydrated</FormLabel>
            <NumberInput>
              <NumberInputField {...register("dehydrated")} />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Cold Damage</FormLabel>
            <NumberInput>
              <NumberInputField {...register("cold_damage")} />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Bruises</FormLabel>
            <NumberInput>
              <NumberInputField {...register("bruises")} />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>open_injury</FormLabel>
            <NumberInput>
              <NumberInputField {...register("open_injury")} />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>scissor_damage</FormLabel>
            <NumberInput>
              <NumberInputField {...register("scissor_damage")} />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>russet_greater_than_4_cm</FormLabel>
            <NumberInput>
              <NumberInputField {...register("russet_greater_than_4_cm")} />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>insect_damage</FormLabel>
            <NumberInput>
              <NumberInputField {...register("insect_damage")} />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>sunburn</FormLabel>
            <NumberInput>
              <NumberInputField {...register("sunburn")} />
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>deformed</FormLabel>
            <NumberInput>
              <NumberInputField {...register("deformed")} />
            </NumberInput>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Inspected Boxes</FormLabel>
            <Input type="number" {...register("inspected_boxes")} />
          </FormControl>
        </VStack>

        <Spacer height={4} />

        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}

export default QcInspection;
