import React from "react";
import { AppInput } from "components/common";
import { InputProps } from "@mui/material";

const InputNumberInventory = (props: InputProps) => {
  return (
    <AppInput
      onKeyDown={(event) => INVALID_CHARS.includes(event.key) && event.preventDefault()}
      type="number"
      {...props}
    />
  );
};

export default InputNumberInventory;

const INVALID_CHARS = ["e", "E", "+", "-", ".", ","];
