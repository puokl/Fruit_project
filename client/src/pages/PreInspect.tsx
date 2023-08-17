import { Box } from "@chakra-ui/react";
import React from "react";
import PreInspection from "../components/PreInspection/PreInspection";

type PreInspectProps = {};

const PreInspect: React.FC<PreInspectProps> = () => {
  return (
    <Box>
      <PreInspection />
    </Box>
  );
};
export default PreInspect;
