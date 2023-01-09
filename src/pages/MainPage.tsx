import React, { useState } from "react";
import AppContext from "../context/AppContext";
import { Detail } from "../components/Detail";
import { DynamicForm } from "../components/DynamicForm";

export const MainPage = () => {
  const [uploadForm, setUploadForm] = useState(false);

  const toggleUploadForm = () => {
    uploadForm ? setUploadForm(false) : setUploadForm(true);
  };

  const contextSettings = {
    uploadForm: uploadForm,
    toggleUploadForm,
  };
  return (
    <div className="main">
      <AppContext.Provider value={contextSettings}>
        <h1>Dashboard - Prueba Cencosud</h1>
        <div className="main__content">
          <DynamicForm />
          <Detail />
        </div>
      </AppContext.Provider>
    </div>
  );
};
