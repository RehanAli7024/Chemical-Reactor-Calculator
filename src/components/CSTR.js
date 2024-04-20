import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const CSTR = () => {
  const [CSTRinputs, setCSTRinputs] = useState({
    volume: 0,
    volumeUnit: "m3",
    flowRate: 0,
    flowRateUnit: "mol/Ls",
    reactionRate: 0,
    reactionRateUnit: "mol/s",
    conversion: 0,
  });

  const oninputchange = (e) => {
    setCSTRinputs({ ...CSTRinputs, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box id="CSTR-containor">
        <p>Leave any one of the fields unfilled to get its value.</p>
        <Box className="InputFields">
          <TextField
            variant="filled"
            name="volume"
            label="Volume"
            type="number"
            onChange={oninputchange}
          ></TextField>
          <Select
            name="volumeUnit"
            labelId="VolumeUnits"
            value={CSTRinputs.volumeUnit}
            onChange={oninputchange}
          >
            <MenuItem value={"cm3"}>cm3</MenuItem>
            <MenuItem value={"m3"}>m3</MenuItem>
            <MenuItem value={"L"}>L</MenuItem>
            <MenuItem value={"ft3"}>ft3</MenuItem>
          </Select>
        </Box>
        <Box className="InputFields">
          <TextField
            name="flowRate"
            variant="filled"
            label="Molar Flow Rate(inlet)"
            type="number"
            onChange={oninputchange}
          ></TextField>
          <Select
            name="flowRateUnit"
            labelId="MolarFlowUnits"
            value={CSTRinputs.flowRateUnit}
            onChange={oninputchange}
          >
            <MenuItem value={"mol/Ls"}>mol/Ls</MenuItem>
            <MenuItem value={"mol/Lmin"}>mol/Lmin</MenuItem>
            <MenuItem value={"lb-mol/Lmin"}>lb-mol/Lmin</MenuItem>
          </Select>
        </Box>
        <Box className="InputFields">
          <TextField
            name="reactionRate"
            variant="filled"
            label="Reaction Rate"
            type="number"
            onChange={oninputchange}
          ></TextField>
          <Select
            name="reactionRateUnit"
            labelId="MolarFlowUnits"
            value={CSTRinputs.reactionRateUnit}
            onChange={oninputchange}
          >
            <MenuItem value={"mol/s"}>mol/s</MenuItem>
            <MenuItem value={"mol/min"}>mol/min</MenuItem>
            <MenuItem value={"lb-mol/min"}>lb-mol/min</MenuItem>
          </Select>
        </Box>
        <TextField
          name="conversion"
          className="conversioninputfield"
          variant="filled"
          label="Conversion (%)"
          type="number"
          inputProps={{ min: 0, max: 100 }}
          onChange={oninputchange}
        ></TextField>
        <Button variant="contained">Calculate</Button>
      </Box>
    </>
  );
};

export default CSTR;
