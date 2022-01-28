import { Button, TextInput } from "carbon-components-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArentFlex, ArentGrid } from "../ui/navigation/layout/ArentGrid";

export default function SelectOptionMaker({ setSelect, options }) {
  const [value, setValue] = useState("");

  return (
    <ArentFlex
      justify="start"
      direction="column"
      width="100%"
      height="100%"
      gap={20}
    >
      <ArentGrid columns="2fr 1fr" gap={10}>
        <TextInput
          id="select-option-maker"
          hideLabel
          placeholder="Enter keyword"
          labelText={""}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          disabled={value.length < 4}
          onClick={() => {
            setSelect((val) => {
              return [...val, value];
            });
            setValue("");
          }}
          style={{ padding: "5px 15px" }}
          size="field"
        >
          Add
        </Button>
      </ArentGrid>
      <ArentFlex
        gap={5}
        justify="start"
        style={{
          overflow: "auto",
          maxHeight: "40px",
          paddingBottom: 20,
          flexWrap: "wrap",
        }}
      >
        {options.map((option, index) => (
          <>
            <motion.span
              key={index + "select-option"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setSelect((val) => {
                  // remove only the option that was clicked
                  return val.filter((item) => item !== option);
                })
              }
              style={{
                fontSize: 12,
                padding: "5px 10px",
                border: "1px solid gray",
                background: "white",
                borderRadius: 5,
                flexGrow: 1,
              }}
            >
              {option}{" "}
            </motion.span>
            {index % 3 === 0 && index !== 0 && (
              <br style={{ flexBasis: "100%", height: 0 }} />
            )}
          </>
        ))}
      </ArentFlex>
    </ArentFlex>
  );
}
