import { Outlet } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

// interface Props {
//   children: React.ReactNode;
// }

export default function Layout() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        h="10vh"
        py={1}
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"90vw"}
          mx="auto"
        >
          <Link to="/">
            <Box>Fruit Team</Box>
          </Link>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Outlet />
    </Box>
  );
}
