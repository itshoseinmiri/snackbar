import Button from "@mui/material/Button";
import Demo from "./components/demo/index";
import "./App.css";
import { openSnackber } from "./context/SnackbarContext";

const handleData = async () => {
  fetch("https://jsonplaceholder.typicode.com/todos")
  .then(() => {
    openSnackber({ title: "Data Fetched", type: "success" });
  })
  .catch(() => {
    openSnackber({ title: "Error fetching data", type: "error" });
  });
}

handleData()


function App() {
  return (
    <>
      <h1>SnackBar Manager</h1>
      <Demo />
      <br />
      <br />
      {/* Complete this button */}
      <Button onClick={() => {openSnackber({ title: "Success", type: "success" })}}>Show success snackbar</Button>
      <Button onClick={() => {openSnackber({ title: "Error", type: "error" })}}>Show error snackbar</Button>
    </>
  );
}

export default App;
