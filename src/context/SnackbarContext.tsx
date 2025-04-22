import { createContext, useRef, useState, ReactNode } from "react";
import { Alert } from "@mui/material";

type SnackbarType = {
  id: number
  title: string
  type: string
};

type SnackbarContextType = {
  setSnackbar: (snackbar: SnackbarType) => void
};

let globalSetSnackbar: (snackbar: Omit<SnackbarType, "id">) => void

export const openSnackber = (snackbar: Omit<SnackbarType, "id">) => {
  if (globalSetSnackbar) globalSetSnackbar(snackbar)
}
const SnackbarContext = createContext<SnackbarContextType | null>(null)

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbars, setSnackbars] = useState<SnackbarType[]>([])
  const snackId = useRef(0)

  const setSnackbar = (newSnack: Omit<SnackbarType, "id">) => {
    const id = snackId.current++

    const snackWithId = { ...newSnack, id }

    setSnackbars((prevSnacks) => {
      const updatedSnackbars = [...prevSnacks, snackWithId];
      return updatedSnackbars.length > 3 ? updatedSnackbars.slice(1) : updatedSnackbars
    });

    const timeout = setTimeout(() => {
      setSnackbars((prevSnacks) => prevSnacks.filter((snack) => snack.id != id))
    }, 5000);

    return () => clearTimeout(timeout)
  };

  globalSetSnackbar = setSnackbar

  return (
    <SnackbarContext.Provider value={{ setSnackbar }}>
      {children}
      <div className="snackbars">
        {[...snackbars].reverse().map((snackbar, index) => (
          <Alert
            key={index}
            severity={snackbar.type}
            variant="filled"
            className="snackbar-alert snackbar"
          >
            {snackbar.title} - { snackbar.id }
          </Alert>
        ))}
      </div>
    </SnackbarContext.Provider>
  )
}