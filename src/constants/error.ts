import { SnackMessage } from "../interfaces/snack-message.interface";

const UNKNOWN_ERROR_MESSAGE =
  "An unknown error has occurd. Please try again later";

const UNAUTHORIZED_ERROR_MESSAGE = "UnAuthorized Error";

const UNKNOWN_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: UNKNOWN_ERROR_MESSAGE,
  type: "error",
};

const UNAUTHORIZED_ERROR_SNACK_MESSAGE: SnackMessage = {
  message: UNAUTHORIZED_ERROR_MESSAGE,
  type: "error",
};
export {
  UNKNOWN_ERROR_SNACK_MESSAGE,
  UNKNOWN_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_SNACK_MESSAGE,
};
