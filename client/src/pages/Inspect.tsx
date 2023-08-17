import { Box } from "@chakra-ui/react";
import React from "react";
import User from "../components/User/User";

type InspectProps = {};

const Inspect: React.FC<InspectProps> = () => {
  return (
    <Box>
      <User />
    </Box>
  );
};
export default Inspect;
