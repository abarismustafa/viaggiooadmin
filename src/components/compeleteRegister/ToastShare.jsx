import { toast } from "react-toastify";

  export const toastSuccessMessage = (str) => {
    toast.success(`${str}`, {
      position: "top-center",
    });
  };
  // Function to show error toast message
 export const toastErrorMessage = (str) => {
    toast.error(`${str}`, {
      position: "top-center",
    });
  };