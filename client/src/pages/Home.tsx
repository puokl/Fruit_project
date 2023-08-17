import { Box, useTheme, useColorMode, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "light" ? "#EEEEEE" : "gray.800";
  const textColor = colorMode === "light" ? "gray.800" : "white";
  return (
    <Box h="90vh">
      <Box bg={theme.colors.primary} color={theme.colors.secondary}>
        <div>Hello from home</div>
      </Box>
      <Box bg={bgColor} color={textColor}>
        <div>Hello from home</div>
      </Box>
      <Link to="/inspection">
        <Button>Start Inspection</Button>
      </Link>
      <Link to="/tableau">
        <Button>Data Visualization</Button>
      </Link>
    </Box>
  );
};
export default Home;
