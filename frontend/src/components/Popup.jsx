import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Popup (prop) {
  const navigate = useNavigate();
  const start = () => {
    navigator.clipboard.writeText(`http://localhost:3000/join/${prop.sessionId}`);
  }

  return (
    <div>
      <Modal
        open={prop.open}
        onClose={prop.onclose}
        aria-labelledby="popup"
        aria-describedby="popup"
      >
        <Box sx={style}>
          {
            prop.use === 'start'
              ? <>
            <Typography id="start pop up" variant="h6" component="h2">
              Session Id
            </Typography>
            <Typography id="start pop up, session id" sx={{ mt: 2 }}>
              {prop.sessionId}
            </Typography>
            <Button variant="contained" onClick={start}>Copy</Button>
            </>
              : <>
            <Typography id="end pop up" variant="h6" component="h2">
              Selection
            </Typography>
            <Typography id="result choice" sx={{ mt: 2 }}>
              Would you like to view the results
            </Typography>
            <Button variant="contained" color="success" onClick={() => navigate(`/result/${prop.sessionId}`)}>Yes</Button>
            </>
          }
        </Box>
      </Modal>
    </div>
  );
}
export default Popup;
