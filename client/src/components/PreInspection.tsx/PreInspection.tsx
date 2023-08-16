import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface FormData {
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
}

const PreInspection: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  //SECTION -
  console.log("validationErrors", validationErrors);
  console.log("isLoading", isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    data.o2_level_percent = parseFloat(data.o2_level_percent.toString());
    data.co2_level_percent = parseFloat(data.co2_level_percent.toString());
    data.pulp_temp_c = parseFloat(data.pulp_temp_c.toString());

    if (isNaN(data.o2_level_percent)) {
      data.o2_level_percent = 0;
    }

    if (isNaN(data.co2_level_percent)) {
      data.co2_level_percent = 0;
    }

    if (isNaN(data.pulp_temp_c)) {
      data.pulp_temp_c = 0;
    }

    if (data.arrival_date === "") {
      data.arrival_date = null;
    }
    if (data.etd === "") {
      data.etd = null;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/api/preinspection`,
        data
      );
      setMessage("Inspection added successfully.");
      setValidationErrors({});
    } catch (error: any) {
      console.error("Error:", error);
      console.log("errors", errors);
      setMessage("Failed to add inspection.");
      setValidationErrors({});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxWidth="400px" margin="0 auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel>Inspection Date</FormLabel>
          <Input
            type="date"
            {...register("inspection_date", { required: true })}
          />

          {errors.inspection_date && <span>Inspection date is required</span>}
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Container</FormLabel>
          <Input
            type="text"
            {...register("container", { required: true, maxLength: 20 })}
          />
          {errors.vessel && <span>Field is too long. Max 20 characters</span>}
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Exporter</FormLabel>
          <Input
            type="text"
            {...register("exporter", { required: true, maxLength: 20 })}
          />
          {errors.exporter && <span>Field is too long. Max 20 characters</span>}
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Importer</FormLabel>
          <Input
            type="text"
            {...register("importer", { required: true, maxLength: 20 })}
          />
          {errors.importer && <span>Field is too long. Max 20 characters</span>}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Vessel</FormLabel>
          <Input type="text" {...register("vessel", { maxLength: 20 })} />
          {errors.vessel && <span>Field is too long. Max 20 characters</span>}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Arrival Date</FormLabel>
          <Input type="date" {...register("arrival_date")} />
          {errors.arrival_date && <span>Something went wrong here</span>}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>O2 Level (%)</FormLabel>
          <Input type="number" step="0.1" {...register("o2_level_percent")} />
          {errors.o2_level_percent && <span>Something went wrong here</span>}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>CO2 Level (%)</FormLabel>
          <Input type="number" step="0.1" {...register("co2_level_percent")} />
          {errors.co2_level_percent && <span>Something went wrong here</span>}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Pulp Temperature (°C)</FormLabel>
          <Input type="number" step="0.1" {...register("pulp_temp_c")} />
          {errors.vessel && <span>Something went wrong here</span>}
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Atmosphere</FormLabel>
          <Input type="text" {...register("atmosphere", { maxLength: 20 })} />
          {errors.atmosphere && (
            <span>Field is too long. Max 20 characters</span>
          )}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>ETD</FormLabel>
          <Input type="date" {...register("etd")} />
          {errors.etd && <span>Something went wrong here</span>}
        </FormControl>

        <Button type="submit" mt={4} colorScheme="teal">
          Add Inspection
        </Button>
      </form>
      {message && <p>{message}</p>}
    </Box>
  );
};

export default PreInspection;
