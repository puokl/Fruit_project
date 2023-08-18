import {
  // Box, useTheme, useColorMode,
  Button,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  // const theme = useTheme();
  // const { colorMode } = useColorMode();
  // const bgColor = colorMode === "light" ? "#EEEEEE" : "gray.800";
  // const textColor = colorMode === "light" ? "gray.800" : "white";
  return (
    <Flex
      h="90vh"
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
      gap={10}
    >
      {/* <Box bg={theme.colors.primary} color={theme.colors.secondary}>
        <div>Hello from home</div>
      </Box>
      <Box bg={bgColor} color={textColor}>
        <div>Hello from home</div>
      </Box> */}

      <Link to="/inspection">
        <Button>Start Inspection</Button>
      </Link>

      <Link to="/getone">
        <Button>Search Inspection</Button>
      </Link>
      <Link to="/tableau">
        <Button>Data Visualization</Button>
      </Link>
    </Flex>
  );
};
export default Home;
