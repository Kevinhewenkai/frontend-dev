import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function EditQuestionsForm () {
  return (
    <>
      <select value={select} onChange={handleSelectInputChange}>
      <option value='single'>Single Choices</option>
      <option value='multiple'>Multiple Choices</option>
    </select>
      <TextField id="outlined-basic" label="Question" variant="outlined"
                 onChange={handleTextInputChange} value={questionText}
      />
      <TextField id="outlined-basic" label="Time" variant="outlined" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                 onChange={handleTimeInputChange} value={time}
      />
      <TextField id="outlined-basic" label="Point" variant="outlined" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                 onChange={handlePointInputChange} value={point}
      />
      <Button
        variant="contained"
        component="label"
      >
        Upload Image Or Video
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleMediaInputChange} value={media}
          hidden
        />
      </Button>
      <h2>Answers</h2>
      <Button variant="contained" color="success" onClick={updateQuestion}>Update</Button>
      <Button variant="contained" color="secondary" onClick={() => navigate(`/quiz/edit/${quizId}`)}>Cancel</Button>
    </>
  )
}

export default EditQuestionsForm;
