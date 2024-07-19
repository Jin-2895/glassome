import { toast, ToastOptions } from "react-toastify";

interface ToastParams {
  title: string;
  type: ToastOptions["type"];
  position: ToastOptions["position"];
}

const onBase = ({ title, type, position }: ToastParams) => {
  toast(title, {
    autoClose: 3000,
    position: position || "top-center",
    type: type || "success",
    hideProgressBar: true,
  });
};

const onWarning = (title: string, position?: ToastOptions["position"]) => {
  onBase({
    title,
    type: "warning",
    position,
  });
};

const onDanger = (title: string, position?: ToastOptions["position"]) => {
  onBase({
    title,
    type: "error",
    position,
  });
};

const onSuccess = (title: string, position?: ToastOptions["position"]) => {
  onBase({
    title,
    type: "success",
    position,
  });
};

const onHide = () => toast.dismiss();

export const ToastService = {
  onDanger,
  onSuccess,
  onWarning,
  onHide,
};
