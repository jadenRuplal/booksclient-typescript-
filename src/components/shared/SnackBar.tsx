import { useDispatch, useSelector } from "react-redux";
import Snackbar from '@mui/material/Snackbar';
import Alert from "@mui/material/Alert";
import { setSnackbar } from "../../features/snackSlice";


type Snack = {
snackbar: any,
state: any,
snackbarType: string 
}


const Snackbars = () => {
  const dispatch = useDispatch()
  const snackbarOpen:any = useSelector<any>(state => state.snackbar.snackbarOpen)
  const snackbarType:any = useSelector<Snack>(state => state.snackbar.snackbarType)
  const snackbarMessage:any = useSelector<any>(state => state.snackbar.snackbarMessage)
  
  const handleClose = (event:any) => {
    dispatch(setSnackbar(false, snackbarType, snackbarMessage));
  };

  return (
    <div >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Snackbars;
