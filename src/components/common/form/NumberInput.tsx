import React, { memo } from "react";
import { Input, InputProps } from "@mui/material";

const NumberInput = ({ inValidChars, ...otherProps }: NumberInputProps) => {
  return (
    <Input
      onKeyDown={(event) =>
        (inValidChars || INVALID_CHARS).includes(event.key) && event.preventDefault()
      }
      type="number"
      {...otherProps}
    />
  );
};

type NumberInputProps = InputProps & {
  inValidChars?: Array<string>;
};

export default memo(NumberInput);

const INVALID_CHARS = ["e", "E", "+", "-", ".", ","];
