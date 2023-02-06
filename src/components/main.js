import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Questions from "../json files/sampleQuestions.json";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FormHelperText from '@mui/material/FormHelperText';

const Main = () => {
  const [quesEle, setQuesEle] = useState(0);
  const [anzValue, setAnzValue] = useState(0);
  var [marks, setMarks] =useState(0);
  const [anzStore, setAnzStore] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [ message, setMessage ] = useState("Select one")
  const handleOpen = () => {
    setOpen(true)
  };
  const handleClose = () => {
    if(anzValue != 0){
      anzStore.map((anz) => {
        if(anz.anz == anz.correctAnz){
          marks = marks+1
        }   
      })
      setMarks(marks)
      setOpen(false);
    } else {
      setMessage("You have to choose one answer")
    }
  }

  const style = { 
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const answerChange = (event) => {
    setAnzValue(event.target.value)
    anzStore[quesEle] = {Question: quesEle, anz: event.target.value, correctAnz: Questions[quesEle].correct};
  };

  const nextQuestion = () => {
    if(anzValue != 0){
      setQuesEle(quesEle+1);
      setAnzValue(0);
      setMessage("Select one")
    } else {
      setMessage("You have to choose one answer")
    }
  }

  const pageNav = (event, value) => {
    if(anzValue != 0){
      setQuesEle(value - 1)
      if(anzStore[value-1]){
        setAnzValue(anzStore[value-1].anz)
      }
    } else {
      setMessage("You have to choose one answer")
    }
  }

  console.log("anzValue: ", anzValue);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={handleOpen}>Attend the questions</Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {Questions[quesEle].question}
              </Typography>
              <RadioGroup
                name="answer-button-group"
                value={anzValue}
                onChange={answerChange}
              >
                <FormControlLabel value={Questions[quesEle].option1} control={<Radio />} label={Questions[quesEle].option1} />
                <FormControlLabel value={Questions[quesEle].option2} control={<Radio />} label={Questions[quesEle].option2} />
                <FormControlLabel value={Questions[quesEle].option3} control={<Radio />} label={Questions[quesEle].option3} />
                <FormControlLabel value={Questions[quesEle].option4} control={<Radio />} label={Questions[quesEle].option4} />
              </RadioGroup>
              <FormHelperText>{message}</FormHelperText>
              {quesEle === Questions.length - 1 
                ? <Button
                    type="submit"
                    onClick={handleClose}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    submit
                  </Button>
                : <Button
                    type="submit"
                    onClick={nextQuestion}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Next
                  </Button>
              }
              <Stack spacing={2} >
                <Pagination count={Questions.length} page={quesEle+1} onChange={pageNav} />
              </Stack>
            </Box>
        </Modal>
        <Typography>My Marks: {marks}/{Questions.length}</Typography>
      </Box>
    </Container>
  );
};

export default Main;
