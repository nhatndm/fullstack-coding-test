import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Heading } from "@chakra-ui/react";

// INTERFACE
import { IRef } from "./DynamicText.interface";

const DynamicText = forwardRef<IRef, any>((props, ref) => {
  const [value, setValue] = useState("Random Text");

  const changeValue = (newValue: string) => {
    setValue(newValue.trim().length > 0 ? newValue : "Random Text");
  };

  useImperativeHandle(ref, () => ({
    onChange: changeValue,
  }));

  return (
    <Heading as="h1" maxWidth="100%" isTruncated>
      {value}
    </Heading>
  );
});

export default DynamicText;
