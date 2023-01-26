import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom";

import { AppRoutes } from "./routes";

const root = ReactDOM.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppRoutes />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
