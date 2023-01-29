import { toast } from "react-toastify";

const position = "top-right";
const theme = "colored";
const hideProgressBar = true;
const autoClose = 5000;

const toastService = {
  showSuccessMessage: (message: string) => {
    toast.success(message, {
      position,
      theme,
      hideProgressBar,
      autoClose,
    });
  },

  showInfoMessage: (message: string) => {
    toast.info(message, {
      position,
      hideProgressBar,
      theme,
      autoClose,
    });
  },

  showErrorMessage: (message: string) => {
    toast.error(message, {
      position,
      hideProgressBar,
      theme,
      autoClose,
    });
  },
};

export default toastService;
