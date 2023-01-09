import React, { createContext } from "react";

const AppContext = createContext({
  uploadForm: false,
  toggleUploadForm: () => {},
});

export default AppContext;
