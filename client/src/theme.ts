// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const customTheme = extendTheme({
  config,
  colors: {
    teal: {
      50: "#E0F2F1",
      100: "#B2DFDB",
      200: "#80CBC4",
      500: "#009688",
    },
    gray: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      800: "#424242",
    },
    indigo: {
      50: "#E8EAF6",
      100: "#C5CAE9",
      200: "#9FA8DA",
      500: "#3F51B5",
    },
    green: {
      50: "#F1F8E9",
      100: "#DCEDC8",
      200: "#C5E1A5",
      500: "#4CAF50",
    },
    orange: {
      50: "#FFF3E0",
      100: "#FFE0B2",
      200: "#FFCC80",
      500: "#FF9800",
    },
    ivory: "#FFFFF0",
    paleYellow: "#FFFFE0",
    white: "#FFFFFF",
  },
});

export default customTheme;
