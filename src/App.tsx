import Button from "@mui/material/Button";
import Demo from "./components/demo/index";
import "./App.css";
import SnackBar,{ useSnackbar } from "./components/Snackbar";
import { useState } from "react";

type DataType = {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

function App() {
  const { snackbars, setSnackbar } = useSnackbar()
  const [data, setData] = useState<DataType[]>([])
  
  const fetchData = async () => {
    try {
      if (!data.length) {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos")
        const data = await response.json()
        setData(data)
        setSnackbar({ title: "Todo list fetched successfuly", type: "success" })
      }
    } catch (error) {
      setSnackbar({ title: error.message, type: "error" })
    }
  }

  const handleData = () => {
    fetchData()
  }

  return (
    <>
      <h1>SnackBar Manager</h1>
      <Demo />
      <SnackBar snackbars={snackbars} />
      <br />
      <br />
      {/* Complete this button */}
      <Button onClick={handleData}>Get Todo List</Button>
      <Button onClick={() => {setSnackbar({ title: 'I Love Snackbar', type: "success" })}}>Show success snackbar</Button>
      <Button onClick={() => {setSnackbar({ title: 'I Love Snackbar', type: "error" })}}>Show error snackbar</Button>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
