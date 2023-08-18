import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  VStack,
  Divider,
  Text,
  Box,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type GetAllProps = {};

interface TestData {
  idinspection: number | null;
  // ... Other properties from your data
}

const GetAll: React.FC<GetAllProps> = () => {
  const [latestData, setLatestData] = useState<{
    test1: TestData;
    test2: TestData;
    test3: TestData;
  }>({
    test1: {
      idinspection: null,
    },
    test2: {
      idinspection: null,
    },
    test3: {
      idinspection: null,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/getall`);
      setIsLoading(false);
    } catch (error) {
      console.error("Error deleting latest data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_SERVER_ENDPOINT}/api/getall`)
        .then((response) => {
          console.log("response.data", response);
          setLatestData(response.data);
        });
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <>
      <VStack
        spacing={4}
        align="stretch"
        maxW={{ base: "100%", md: "50vw" }}
        mx={{ base: "10px", md: "auto" }}
      >
        <Box p={4} borderWidth={1} borderRadius="md">
          <Text fontSize="xl">Test 1 Data</Text>
          <Divider my={2} />
          {latestData.test1 && (
            <>
              {Object.entries(latestData.test1).map(([key, value]) => (
                <Text key={key}>
                  {key}: {value}
                </Text>
              ))}
            </>
          )}
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md">
          <Text fontSize="xl">Test 2 Data</Text>
          <Divider my={2} />
          {latestData.test2 && (
            <>
              {Object.entries(latestData.test2).map(([key, value]) => (
                <Text key={key}>
                  {key}: {value}
                </Text>
              ))}
            </>
          )}
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md">
          <Text fontSize="xl">Test 3 Data</Text>
          <Divider my={2} />
          {latestData.test3 && (
            <>
              {Object.entries(latestData.test3).map(([key, value]) => (
                <Text key={key}>
                  {key}: {value}
                </Text>
              ))}
            </>
          )}
        </Box>
      </VStack>
      <Link to="/">
        <Button>Continue</Button>
      </Link>
      <Button
        colorScheme="red"
        onClick={handleDelete}
        isLoading={isLoading}
        mb={isMobile ? 4 : 0}
      >
        Delete Latest Data
      </Button>
    </>
  );
};
export default GetAll;
