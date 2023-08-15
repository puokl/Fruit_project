import { Box, useTheme, useColorMode } from "@chakra-ui/react";
import React from "react";

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "light" ? "#EEEEEE" : "gray.800";
  const textColor = colorMode === "light" ? "gray.800" : "white";
  return (
    <>
      <Box bg={theme.colors.primary} color={theme.colors.secondary}>
        <div>Hello from home</div>
      </Box>
      <Box bg={bgColor} color={textColor}>
        <div>Hello from home</div>
      </Box>
    </>
  );
};
export default Home;
