import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { FunctionComponent } from "react";
import { IField } from "../types/FieldType";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";

export const DatePickerCustom: FunctionComponent<IField> = ({
  id,
  name,
  label,
  options,
  validations,
}: IField) => {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());

  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        
        label={label}
        inputFormat="DD/MM/YYYY"
        value={date}
        onChange={handleChange}
        renderInput={(params) => <TextField name={name} {...params} />}
      />
    </LocalizationProvider>
  );
};
