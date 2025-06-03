import { toast } from "react-toastify";

function ShowToastMessage(success,message) {
  return (
    toast[success ? "success" : "error"](message)
  );
}

export default ShowToastMessage