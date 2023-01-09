import { TextField } from "@mui/material";
import React, { FunctionComponent } from "react";
import { IField } from "../types/FieldType";

export const TextFieldCustom: FunctionComponent<IField> = ({
  id,
  type,
  name,
  label,
  validations,
}: IField) => {
  return (
    <TextField
      label={label}
      name={name}
      rows={type === "text-area" ? 4 : 0}
      multiline={type === "text-area" ? true : false}
    />
  );
};
