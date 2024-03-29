export const SET_SNACKBAR = "teamly/settings/SET_SNACKBAR";

const initialState = {
  snackbarOpen: false,
  snackbarType: "success",
  snackbarMessage: ""
}

export default (state = initialState, action: { type?: any; snackbarOpen?: any; snackbarMessage?: any; snackbarType?: any; }) => {
  switch (action.type) {
    case SET_SNACKBAR:
      const { snackbarOpen, snackbarMessage, snackbarType } = action;
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarMessage
      };
    default:
      return state
  }
}

export const setSnackbar = (
  snackbarOpen:any,
  snackbarType = "success",
  snackbarMessage = ""
) => ({
  type: SET_SNACKBAR,
  snackbarOpen,
  snackbarType,
  snackbarMessage
})
