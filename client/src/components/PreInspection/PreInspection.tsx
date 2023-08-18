import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  useMediaQuery,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { PreInspectionType } from "../../types/InspectionType";
import { useNavigate, Link } from "react-router-dom";

const PreInspection: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  //SECTION -
  console.log("validationErrors", validationErrors);
  console.log("isLoading", isLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PreInspectionType>();

  const onSubmit = async (data: PreInspectionType) => {
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
      reset();

      setTimeout(() => {
        navigate("/qcinspection");
      }, 2000);
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
    <Box
      maxW={isMobile ? "100%" : "40vw"}
      mx={isMobile ? 20 : "auto"}
      textAlign="center"
      mt={4}
    >
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
            {...register("container", {
              required: true,
              maxLength: { value: 20, message: "Max 20 characters" },
            })}
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
          <Flex justifyContent="space-between" alignItems={"baseline"}>
            <FormLabel>O2 Level (%)</FormLabel>
            <FormHelperText>
              Enter a percentage value (e.g., 5.5)
            </FormHelperText>
          </Flex>
          <Input type="number" step="0.1" {...register("o2_level_percent")} />
          {errors.o2_level_percent && <span>Something went wrong here</span>}
        </FormControl>

        <FormControl mt={4}>
          <Flex justifyContent="space-between" alignItems={"baseline"}>
            <FormLabel>CO2 Level (%)</FormLabel>
            <FormHelperText>
              Enter a percentage value (e.g., 5.5)
            </FormHelperText>
          </Flex>
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

        <Button type="submit" my={4} colorScheme="teal">
          Add Inspection
        </Button>
      </form>
      {message && <p>{message}</p>}
      <Link to="../qcinspection">
        <Button>Continue</Button>
      </Link>
    </Box>
  );
};

export default PreInspection;
