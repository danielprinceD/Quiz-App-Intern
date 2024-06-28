import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { UseChoiceContext } from "./Form";

const Choices = () => {
  const { question } = UseChoiceContext();
  const [choiceCount, setChoiceCount] = useState(1);
  const [choiceValue, setChoiceValue] = useState([""]);
  const handleChoiceCount = () => {
    const increement = choiceCount + 1;
    setChoiceValue([...choiceValue, ""]);
    setChoiceCount(choiceCount + 1);
  };
  return (
    <>
      {choiceValue.map((choice, ind) => (
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id={`choice${ind + 1}`}
            name="Choice"
            label={`Choice ${ind + 1}`}
            fullWidth
            onChange={(e) => {
              choiceValue[ind] = e.target.value;
              question.choices = choiceValue;
            }}
            autoComplete="shipping address-level2"
          />
        </Grid>
      ))}

      <Grid item xs={12} sm={6}>
        <Button onClick={handleChoiceCount}>Add</Button>
      </Grid>
    </>
  );
};

export default Choices;