import React, { useEffect } from "react";
// @ts-ignore
import tableau from "tableau-api";

type TableauProps = {};

const Tab: React.FC<TableauProps> = () => {
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
          "https://eu-west-1a.online.tableau.com/t/fruitqc/views/QC_Dash/Dashboard1"
        );
        vizElement.setAttribute("hide-tabs", "");
        vizElement.setAttribute("toolbar", "bottom");

        // Set width and height using JavaScript
        vizElement.style.width = "1000px";
        vizElement.style.height = "840px";

        // Initialize the Tableau Viz
        const tableauAuth = tableau.auth.userPasswordAuth(
          import.meta.env.VITE_TABLEAU_USERNAME,
          import.meta.env.VITE_TABLEAU_PASSWORD
        );
        console.log("tableauAuth", tableauAuth);
        tableauAuth.submit().then(() => {
          tableau.Viz.refreshAsync();
        });

        vizContainer.appendChild(vizElement);
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
    <div>
      <h1>hi from tab</h1>
      <div id="tableau-viz-container"></div>
    </div>
  );
};
export default Tab;
