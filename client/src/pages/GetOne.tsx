import { useState } from "react";
import axios from "axios";
import {
  Button,
  Input,
  VStack,
  Box,
  Text,
  Divider,
  Flex,
} from "@chakra-ui/react";

type GetOneProps = {};

const GetOne: React.FC<GetOneProps> = () => {
  const [rowNumber, setRowNumber] = useState<number | "">("");
  const [rowData, setRowData] = useState<any>({
    test1: {},
    test2: {},
    test3: {},
  });

  const handleFetchRowData = async () => {
    if (!rowNumber || isNaN(Number(rowNumber))) {
      return; // Return early if input is invalid
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/api/getone/${rowNumber}`
      );
      console.log("response", response);
      setRowData(response.data);
    } catch (error) {
      console.error("Error fetching specific row data:", error);
      setRowData({ test1: {}, test2: {}, test3: {} });
    }
  };

  return (
    <VStack
      spacing={4}
      align="stretch"
      maxW={{ base: "100%", md: "50vw" }}
      mx={{ base: "10px", md: "auto" }}
    >
      <Input
        placeholder="Enter row number"
        value={rowNumber}
        onChange={(e) => setRowNumber(parseInt(e.target.value, 10) || "")}
        type="number"
        min={1}
        maxW={"40%"}
        my={4}
      />
      <Button onClick={handleFetchRowData}>Fetch Row Data</Button>

      {Object.entries(rowData).map(([tableName, tableData]) => (
        <Box p={4} borderWidth={1} borderRadius="md" key={tableName}>
          <Text fontSize="xl">{tableName} Data</Text>
          <Divider my={2} />
          {Object.entries(tableData as { [key: string]: unknown }).map(
            ([key, value]) => (
              //   <Text key={key}>
              //     {key}: {String(value)}
              //   </Text>
              <Flex key={key} justifyContent="space-between">
                <Text fontWeight="bold">{key}:</Text>
                <Text mr={10}>{String(value)}</Text>
              </Flex>
            )
          )}
        </Box>
      ))}
    </VStack>
  );
};
export default GetOne;
