import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
} from "@mui/material";
import dayjs from "dayjs";
import React, {
  FunctionComponent,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import AppContext from "../context/AppContext";
import form1 from "../data/form1.json";
import form2 from "../data/form2.json";
import form3 from "../data/form3.json";
import { IField } from "../types/FieldType";
import { DatePickerCustom } from "./DatePickerCustom";
import { SelectCustom } from "./SelectCustom";
import { TextFieldCustom } from "./TextFieldCustom";
import { UploadFileCustom } from "./UploadFileCustom";

export const DynamicForm: FunctionComponent = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const myContext = useContext(AppContext);

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };
  // Arreglo que contiene el json del formulario a utilizar
  const [form, setForm] = useState<IField[]>(form1.form);

  // Nombre del formulario que se setea con los radio buttons
  const [formSelected, setFormSelected] = useState("form1");

  const [loading, setLoading] = useState(false);
  const [formResponse, setFormResponse] = useState({
    select1: "",
    select2: "",
    comment: "",
    reason: "",
    details: "",
    eventDate: "",
    fromDate: "",
    untilDate: "",
    file: "",
  });

  //TODO: REVISAR SI SIRVE PARA ACTUALIZAR ERRORES EN COMPONENTES / SINO BORRAR
  const [submitted, setSubmitted] = useState(false);

  // Funcion para actualizar estado que contiene el nombre del formulario seleccionado
  const handleOnChangeFormSelected = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log((event.target as HTMLInputElement).value);
    const res: string = (event.target as HTMLInputElement).value;
    setFormSelected(res);
  };

  useEffect(() => {
    switch (formSelected) {
      case "form1":
        setForm(form1.form);
        break;
      case "form2":
        setForm(form2.form);
        break;
      case "form3":
        setForm(form3.form);
        break;
      case "allforms":
        const allforms = [...form1.form, ...form2.form, ...form3.form];
        setForm(allforms);
        console.log(allforms);
        break;
    }
  }, [formSelected]);

  const handleOnSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    setLoading(true);
    await setTimeout(() => {
      const target = event.target as typeof event.target & {
        // form 1
        "select-1": { value: string };
        "select-2": { value: string };
        comment: { value: string };

        // form 2
        reason: { value: string };
        details: { value: string };
        eventDate: { value: string };

        // form 3
        fromDate: { value: string };
        untilDate: { value: string };
        file: { value: string };
      };

      const select1 = target["select-1"]?.value;
      const select2 = target["select-2"]?.value;
      const comment = target["comment"]?.value;

      const reason = target["reason"]?.value;
      const details = target["details"]?.value;
      const eventDate = target["eventDate"]?.value;

      const fromDate = target["fromDate"]?.value;
      const untilDate = target["untilDate"]?.value;
      const file = target["file"]?.value;

      const formEntry = {
        select1,
        select2,
        comment,
        reason,
        details,
        eventDate,
        fromDate,
        untilDate,
        file,
        entryDate: dayjs().format("DD/MM/YYYY HH:mm").toString(),
        entryForm: formSelected,
      };

      const storedForms = localStorage.getItem("storedForms")
        ? JSON.parse(localStorage.getItem("storedForms") || "")
        : [];

      const formSaved = [...storedForms, formEntry];
      localStorage.setItem("storedForms", JSON.stringify(formSaved));

      setLoading(false);
      handleOpenSnackBar();
      myContext.toggleUploadForm();
    }, 1000);
  };

  return (
    <div className="dynamicForm">
      <Snackbar
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Formulario registrado exitosamente!
        </Alert>
      </Snackbar>
      <FormControl>
        <FormLabel>Seleccione un formulario:</FormLabel>
        <RadioGroup
          row
          value={formSelected}
          onChange={handleOnChangeFormSelected}
        >
          <FormControlLabel
            value="form1"
            control={<Radio />}
            label="Formulario 1"
          />
          <FormControlLabel
            value="form2"
            control={<Radio />}
            label="Formulario 2"
          />
          <FormControlLabel
            value="form3"
            control={<Radio />}
            label="Formulario 3"
          />
          <FormControlLabel
            value="allforms"
            control={<Radio />}
            label="Todos los formularios"
          />
        </RadioGroup>
      </FormControl>

      <form className="dynamicForm dynamicForm__form" onSubmit={handleOnSubmit}>
        {form.length > 0
          ? form.map((item) => {
              switch (item.type) {
                case "input":
                case "text-area":
                  return (
                    <TextFieldCustom
                      key={`${item.id}-${item.name}`}
                      id={item.id}
                      type={item.type}
                      name={item.name}
                      label={item.label}
                      value={item.value}
                      options={item.options || []}
                      validations={item.validations || []}
                    />
                  );

                case "select":
                  return (
                    <SelectCustom
                      key={`${item.id}-${item.name}`}
                      id={item.id}
                      type={item.type}
                      name={item.name}
                      label={item.label}
                      value={item.value}
                      options={item.options || []}
                      validations={item.validations || []}
                    />
                  );

                case "date-picker":
                  return (
                    <DatePickerCustom
                      key={`${item.id}-${item.name}`}
                      id={item.id}
                      type={item.type}
                      name={item.name}
                      label={item.label}
                      value={item.value}
                      options={item.options || []}
                      validations={item.validations || []}
                    />
                  );

                case "file":
                  return (
                    <UploadFileCustom
                      key={`${item.id}-${item.name}`}
                      id={item.id}
                      type={item.type}
                      name={item.name}
                      label={item.label}
                      value={item.value}
                      options={item.options || []}
                      validations={item.validations || []}
                    />
                  );

                default:
                  return null;
              }
            })
          : null}

        <Button
          className="dynamicForm dynamicForm__saveButton"
          variant="contained"
          type="submit"
          value="Guardar"
          id="saveFormButton"
          disabled={loading}
          onClick={() => setSubmitted(!submitted)}
        >
          Guardar Registro
          {loading ? <CircularProgress /> : null}
        </Button>
      </form>
    </div>
  );
};
