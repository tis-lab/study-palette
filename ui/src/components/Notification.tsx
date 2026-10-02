import { Alert, AlertColor, Snackbar } from "@mui/material";

interface Props {
  open: boolean;
  onClose?: () => void;
  message?: string;
  severity: AlertColor;
}

export default function Notification({
  open,
  onClose,
  message,
  severity,
}: Props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={onClose}
      autoHideDuration={5000}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
