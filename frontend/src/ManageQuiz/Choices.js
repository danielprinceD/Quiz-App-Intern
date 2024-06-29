import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { UseChoiceContext } from "./Form";

const Choices = ({ myChoices, count }) => {
  const { question } = UseChoiceContext();

  const [choiceCount, setChoiceCount] = useState(count);
  const [choiceValue, setChoiceValue] = useState(myChoices);
  const handleChoiceCount = () => {
    const increement = choiceCount + 1;
    setChoiceValue([...choiceValue, ""]);
    setChoiceCount((p) => p + 1);
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
              setChoiceValue((prevItems) => {
                const newItems = [...prevItems];
                newItems.splice(ind, 1, e.target.value);
                return newItems;
              });
              choiceValue[ind] = e.target.value;
              question.choices[ind] = choiceValue[ind];
              // console.log(choiceValue);
            }}
            value={choice}
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
