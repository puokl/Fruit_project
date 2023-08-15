import React from "react";
import PreInspectionForm from "../components/Inspection/Inspection";
import { Text } from "@chakra-ui/react";

type TestProps = {};

const Test: React.FC<TestProps> = () => {
  return (
    <>
      <Text>Hello from test</Text>
      <PreInspectionForm />
    </>
  );
};
export default Test;
