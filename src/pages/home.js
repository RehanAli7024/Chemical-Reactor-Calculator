import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import "./home.css";
import { useState } from "react";

const Home = () => {
  const [reactorType, setreactorType] = useState("");
  const handlereactorType = (event) => {
    setreactorType(event.target.value);
  };
  return (
    <>
      <Box id="calculator-containor">
        <h2>Chemical Reactor Yield Calculator</h2>
        <FormControl id="ReactorTypeSelector">
          <InputLabel>Reactor</InputLabel>
          <Select
            labelId="ReactorType"
            id="ReactorType"
            label="Reactor"
            value={reactorType}
            onChange={handlereactorType}
          >
            <MenuItem value={"Batch"}>Batch Reactor</MenuItem>
            <MenuItem value={"CSTR"}>Continously Stirred Tank Reactor</MenuItem>
            <MenuItem value={"PFR"}>Plug Flow Reactor</MenuItem>
            <MenuItem value={"PBR"}>Packed Bed Reactor</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default Home;
