import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
// @ts-ignore
import tableau from "tableau-api";

type TableauProps = {};

const Tableau: React.FC<TableauProps> = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://eu-west-1a.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js";
    script.async = true;
    script.onload = () => {
      // The script is loaded, now create and render the tableau-viz element
      const vizContainer = document.getElementById("tableau-viz-container");

      if (vizContainer && vizContainer.children.length === 0) {
        const vizElement = document.createElement("tableau-viz");
        vizElement.setAttribute("id", "tableau-viz");
        vizElement.setAttribute(
          "src",
          "https://eu-west-1a.online.tableau.com/t/fruitqc/views/QCF_CAB/A"
        );
        vizElement.setAttribute("hide-tabs", "");
        vizElement.setAttribute("toolbar", "bottom");

        vizContainer.appendChild(vizElement);

        // Set width and height using JavaScript
        vizElement.style.width = "100vw";
        vizElement.style.height = "100vh";

        // Initialize the Tableau Viz
        tableau.Viz.refreshAsync();
      }
    };

    // Append the script tag to the document
    document.body.appendChild(script);

    // Cleanup: remove the script tag when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box>
      <Box id="tableau-viz-container" w="100%" h="100%"></Box>
    </Box>
  );
};
export default Tableau;
