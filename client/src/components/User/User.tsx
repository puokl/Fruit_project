import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { UserType } from "../../types/InspectionType";
import { useNavigate, Link } from "react-router-dom";

const User: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<UserType>();
  const [message, setMessage] = useState<string>("");
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserType> = async (data: {
    inspector_name: string;
    fruit: string;
  }) => {
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/users`, {
        inspector_name: data.inspector_name,
        fruit: data.fruit,
      });

      setMessage("User added successfully.");
      reset();

      setTimeout(() => {
        navigate("/preinspection");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to add user.");
    }
  };

  return (
    <Box
      maxW={isMobile ? "100%" : "40vw"}
      mx={isMobile ? 20 : "auto"}
      textAlign="center"
    >
      <Text as="h2" fontSize="xl" mb={4}>
        Add User
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mb={4}>
          <FormLabel>Inspector Name:</FormLabel>
          <Input
            type="text"
            {...register("inspector_name", { required: true })}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Fruit:</FormLabel>
          <Input type="text" {...register("fruit", { required: true })} />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Add User
        </Button>
      </form>
      {message && <Text mt={4}>{message}</Text>}
      <Link to="../preinspection">
        <Button>Continue</Button>
      </Link>
    </Box>
  );
};

export default User;
