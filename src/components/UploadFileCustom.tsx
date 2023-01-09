import { Button } from "@mui/material";
import React, { FunctionComponent } from "react";
import { IField } from "../types/FieldType";

export const UploadFileCustom: FunctionComponent<IField> = ({
  id,
  type,
  name,
  label,
  validations,
}: IField) => {
  return (
    <Button variant="contained" component="label">
      Upload File
      <input type="file" hidden name={name} />
    </Button>
  );
};
