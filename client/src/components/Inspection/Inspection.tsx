import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

interface FormData {
  InspectionDate: Date;
  ContainerNo: string;
  Exporter: string;
  Importer: string;
  Vessel: string;
}

const PreInspectionForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/api/users`,
        data
      );

      if (response.status === 200) {
        console.log("Table created successfully");
      } else {
        console.error("Error creating table");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="inspectionDate">Inspection Date</FormLabel>
          <Input
            type="date"
            id="inspectionDate"
            {...register("InspectionDate", { required: "Required" })}
          />
          {errors["InspectionDate"] && (
            <FormErrorMessage>
              {errors["InspectionDate"].message}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="containerNo">Container No.</FormLabel>
          <Input
            type="text"
            id="containerNo"
            {...register("ContainerNo", { required: "Required" })}
          />
          <FormErrorMessage>{errors["ContainerNo"]?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="exporter">Exporter</FormLabel>
          <Input
            type="text"
            id="exporter"
            {...register("Exporter", { required: "Required" })}
          />
          <FormErrorMessage>{errors["Exporter"]?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="importer">Importer</FormLabel>
          <Input
            type="text"
            id="importer"
            {...register("Importer", { required: "Required" })}
          />
          <FormErrorMessage>{errors["Importer"]?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="vessel">Vessel</FormLabel>
          <Input type="text" id="vessel" {...register("Vessel")} />
        </FormControl>

        {/* Repeat the above pattern for other form controls */}

        <Button
          type="submit"
          isLoading={isSubmitting}
          loadingText="Submitting"
          colorScheme="blue"
        >
          Create Table Entry
        </Button>
      </VStack>
    </form>
  );
};

export default PreInspectionForm;
