import { Box } from "@chakra-ui/react";
import React from "react";
import QcInspection from "../components/QcInspection/QcInspection";

type QcInspectProps = {};

const QcInspect: React.FC<QcInspectProps> = () => {
  return (
    <Box>
      <QcInspection />
    </Box>
  );
};
export default QcInspect;
