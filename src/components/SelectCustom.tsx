import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import { IField, IOptions } from "../types/FieldType";

export const SelectCustom: FunctionComponent<IField> = ({
  id,
  name,
  label,
  options,
  validations
}: IField) => {
  // console.log("selectcustom", validations);
  const [optionValue, setOptionValue] = useState("");


  const handleChangeOptionValue = (event: SelectChangeEvent) => {
    setOptionValue(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={optionValue}
        label={label}
        onChange={handleChangeOptionValue}
        required
      >
        {options?.map((op: IOptions) => (
          <MenuItem key={op.id} value={op.value}>
            {op.label}
          </MenuItem>
        ))}
      </Select>
      {/* {error ? <p>Requerido</p> : null} */}
    </FormControl>
  );
};
