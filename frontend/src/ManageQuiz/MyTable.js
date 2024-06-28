import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Conformation from "./Conformation";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { Grid, TextField } from "@mui/material";
const MyQuizTableContext = React.createContext();
export default function MyTable({ rows }) {
  const [name, setName] = React.useState("");
  const [count, setCount] = React.useState(0);
  const [questions, setQuestions] = React.useState([]);
  const handleDelete = (id) => {
    axios.delete("http://localhost:8000/api/admin/quiz/delete/" + id);
  };
  const handleEdit = (id) => {
    axios.put("http://localhost:8000/api/admin/quiz/update/" + id, {
      id: id,
      name: name,
      count: count,
      questions: questions,
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Quiz Name</TableCell>
            <TableCell align="right">Questions</TableCell>
            <TableCell align="right">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, ind) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {ind + 1}
              </TableCell>
              <TableCell component="right">{row.name}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">
                <MyQuizTableContext.Provider
                  value={{
                    handleEdit,
                    handleDelete,
                    name,
                    setName,
                    count,
                    setCount,
                    questions,
                    setQuestions,
                  }}
                >
                  <Conformation
                    button="Edit"
                    header={"Edit"}
                    ConfirmName={row.name}
                    questCount={row.count}
                    body={
                      <>
                        {questions.map((question, index) => (
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant="h6" gutterBottom>
                                Question {index + 1}
                              </Typography>
                              <TextField
                                required
                                id="address1"
                                name="address1"
                                label="Quiz"
                                fullWidth
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                }}
                                autoComplete="shipping address-line1"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="h6" gutterBottom>
                                Question {index + 1}
                              </Typography>
                              <TextField
                                required
                                id="address1"
                                name="address1"
                                label="Question"
                                fullWidth
                                value={question.question}
                                onChange={(e) => {
                                  question.question = e.target.value;
                                }}
                                autoComplete="shipping address-line1"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id="city"
                                name="city"
                                label="Choice 1"
                                value={question.ch1}
                                fullWidth
                                onChange={(e) => {
                                  question.ch1 = e.target.value;
                                }}
                                autoComplete="shipping address-level2"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                value={question.ch2}
                                id="state"
                                name="state"
                                onChange={(e) => {
                                  question.ch2 = e.target.value;
                                }}
                                label="Choice 2"
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                id="zip"
                                value={question.ch3}
                                name="zip"
                                onChange={(e) => {
                                  question.ch3 = e.target.value;
                                }}
                                label="Choice 3"
                                fullWidth
                                autoComplete="shipping postal-code"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                id="country"
                                name="country"
                                value={question.ch4}
                                onChange={(e) => {
                                  question.ch4 = e.target.value;
                                }}
                                required
                                label="Choice 4"
                                fullWidth
                                autoComplete="shipping country"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                id="answer"
                                name="answer"
                                value={question.answer}
                                onChange={(e) => {
                                  question.answer = e.target.value;
                                }}
                                required
                                label="Answer"
                                fullWidth
                                autoComplete="Answer"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                id="image"
                                value={question.image}
                                name="image"
                                onChange={(e) => {
                                  question.image = e.target.value;
                                }}
                                required
                                label="Image"
                                fullWidth
                                autoComplete="Image"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                required
                                id="points"
                                value={question.points}
                                name="points"
                                type="number"
                                minRows={"0"}
                                onChange={(e) => {
                                  question.points = e.target.value;
                                }}
                                InputProps={{ inputProps: { min: 0 } }}
                                label="Points"
                                fullWidth
                                autoComplete="points"
                              />
                            </Grid>
                          </Grid>
                        ))}
                      </>
                    }
                    id={row.id}
                    left="Cancel"
                    right="Save"
                    color="primary"
                  />
                  <Conformation
                    id={row.id}
                    header={"Delete"}
                    body={"Do you want to delete ?"}
                    button="Delete"
                    left="Cancel"
                    right="Delete"
                    color="error"
                  />
                </MyQuizTableContext.Provider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const UseQuizTableContext = () => {
  return React.useContext(MyQuizTableContext);
};
