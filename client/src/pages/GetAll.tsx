import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  VStack,
  Divider,
  Text,
  Box,
  Button,
  useMediaQuery,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  PreInspectionType,
  QcInspectionType,
  UserType,
} from "../types/InspectionType";

type GetAllProps = {};

const GetAll: React.FC<GetAllProps> = () => {
  const [latestData, setLatestData] = useState<{
    test1: UserType;
    test2: PreInspectionType;
    test3: QcInspectionType;
  }>({
    test1: { inspector_name: "", fruit: "" },
    test2: {
      inspection_date: "",
      container: "",
      exporter: "",
      importer: "",
      vessel: "",
      arrival_date: null,
      o2_level_percent: 0,
      co2_level_percent: 0,
      pulp_temp_c: 0,
      atmosphere: "",
      etd: null,
    },
    test3: {
      int_pallet_nr: 0,
      pallet_number: "",
      caliber: "",
      box_net_weight_g: 0,
      grower: "",
      grw_boxes_per_pallet: 0,
      total_boxes_per_pallet: 0,
      packing_date: null,
      peduncular_mold: 0,
      decay: 0,
      soft: 0,
      dehydrated: 0,
      cold_damage: 0,
      bruises: 0,
      open_injury: 0,
      scissor_damage: 0,
      russet_greater_than_4_cm: 0,
      insect_damage: 0,
      sunburn: 0,
      deformed: 0,
      inspected_boxes: 0,
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
          <Text fontSize="xl">Inspector Data</Text>
          <Divider my={2} />
          {latestData.test1 && (
            <>
              {Object.entries(latestData.test1).map(([key, value]) => (
                <Flex key={key} justifyContent="space-between">
                  <Text fontWeight="bold">{key}:</Text>
                  <Text mr={10}>{value}</Text>
                </Flex>
              ))}
            </>
          )}
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md">
          <Text fontSize="xl">Pre Inspection Data</Text>
          <Divider my={2} />
          {latestData.test2 && (
            <>
              {Object.entries(latestData.test2).map(([key, value]) => (
                <Flex key={key} justifyContent="space-between">
                  <Text fontWeight="bold">{key}:</Text>
                  <Text mr={10}>{value}</Text>
                </Flex>
              ))}
            </>
          )}
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md">
          <Text fontSize="xl">QC Inspection Data</Text>
          <Divider my={2} />
          {latestData.test3 && (
            <>
              {Object.entries(latestData.test3).map(([key, value]) => (
                <Flex key={key} justifyContent="space-between">
                  <Text fontWeight="bold">{key}:</Text>
                  <Text mr={10}>{value}</Text>
                </Flex>
              ))}
            </>
          )}
        </Box>
      </VStack>
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        direction={"column"}
        my={4}
        gap={4}
      >
        <Link to="/">
          <Button>Done</Button>
        </Link>
        <Button
          colorScheme="red"
          onClick={handleDelete}
          isLoading={isLoading}
          mb={isMobile ? 4 : 0}
        >
          Delete Latest Data
        </Button>
      </Flex>
    </>
  );
};
export default GetAll;
