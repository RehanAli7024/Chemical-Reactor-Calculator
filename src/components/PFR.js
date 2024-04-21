import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
const PFR = () => {
  const [PFRInputs, setPFRInputs] = useState({
    volume: -1,
    volumeUnit: "m3",
    flowRate: -1,
    flowRateUnit: "mol/Ls",
    reactionRate: "",
    reactionRateUnit: "mol/s",
  });
  const oninputchange = (e) => {
    setPFRInputs({ ...PFRInputs, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Box id="CSTR-containor">
        <Box className="InputFields">
          <TextField
            name="volume"
            variant="filled"
            label="Volume"
            type="number"
            onChange={oninputchange}
          ></TextField>
          <Select
            name="volumeUnit"
            labelId="VolumeUnits"
            value={PFRInputs.volumeUnit}
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
            value={PFRInputs.flowRateUnit}
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
            placeholder="eg. 2x^2"
            onChange={oninputchange}
          ></TextField>
          <Select
            name="reactionRateUnit"
            labelId="ReactionRate"
            value={PFRInputs.reactionRateUnit}
            onChange={oninputchange}
          >
            <MenuItem value={"mol/s"}>mol/s</MenuItem>
            <MenuItem value={"mol/min"}>mol/min</MenuItem>
            <MenuItem value={"lb-mol/min"}>lb-mol/min</MenuItem>
          </Select>
        </Box>

        <Button variant="contained">Calculate Conversion</Button>
      </Box>
    </>
  );
};

export default PFR;
