import axios from "axios";
import toast from "react-hot-toast";
import { debounce } from "@utils/debounce";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const request = axios.create({
  baseURL: BACKEND_URL,
});

// Globally notify about network errors

// Keep the notifications limited
// even when multiple requests fail
const toastError = debounce(() => {
  toast.error(
    "Hubo un error al conectarse con el servidor. Contáctese con los desarrolladores del sitio"
  );
}, 1000);

request.interceptors.request.use(
  req => {
    return req;
  },
  err => err
);

request.interceptors.response.use(
  res => res,
  err => {
    if (err.request && !err.response) {
      toastError();
      return;
    }
    throw err;
  }
);
