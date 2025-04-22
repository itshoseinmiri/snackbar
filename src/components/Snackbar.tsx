import { Alert } from "@mui/material";
import { useState, useRef } from "react";

import '../App.css';

type SnackbarType = {
    id: number,
    title: string,
    type: string,
}[]

export const useSnackbar = () => {
    const [snackbars, setSnackbars] = useState<SnackbarType>([])
    const snackId = useRef(0)

    const setSnackbar = (newSnack: { title: string; type: string }) => {
        const id = snackId.current++
    
        const snackWithId = { ...newSnack, id }
    
        setSnackbars((prevSnacks) => {
          const updatedSnackbars = [...prevSnacks, snackWithId]
          return updatedSnackbars.length > 3 ? updatedSnackbars.slice(1) : updatedSnackbars
        });
        
        const timeout = setTimeout(() => {
            setSnackbars((prevSnacks) => prevSnacks.filter((snack) => snack.id != id))
        }, 5000)
    
        return () => clearTimeout(timeout)
      }
    
    return {snackbars, setSnackbar}
}


const SnackBar = ({ snackbars }: { snackbars: SnackbarType }) => {
    return (
        <>
            <div className="snackbars">
            {[...snackbars].reverse().map((snackbar, index) => (
                    <Alert
                        key={index}
                        severity={snackbar.type}
                        variant="filled"
                        className="snackbar-alert snackbar"
                    >
                        {snackbar.title} - {  snackbar.id}
                    </Alert>
                ))}
            </div>
        </>
    )
}

export default SnackBar