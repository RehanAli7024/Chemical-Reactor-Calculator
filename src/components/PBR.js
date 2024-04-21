import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
const PBR = () => {
  const [PBRinputs, setPBRinputs] = useState({
    weight: -1,
    weightUnit: "kg",
    flowRate: -1,
    flowRateUnit: "mol/Ls",
    reactionRate: "",
    reactionRateUnit: "mol/kg-s",
  });
  const oninputchange = (e) => {
    setPBRinputs({ ...PBRinputs, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Box id="CSTR-containor">
        <Box className="InputFields">
          <TextField
            name="weight"
            variant="filled"
            label="Weight of Catalyst"
            type="number"
            onChange={oninputchange}
          ></TextField>
          <Select
            name="weightUnit"
            labelId="weightUnits"
            value={PBRinputs.weightUnit}
            onChange={oninputchange}
          >
            <MenuItem value={"kg"}>kg</MenuItem>
            <MenuItem value={"g"}>g</MenuItem>
            <MenuItem value={"lbs"}>lbs</MenuItem>
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
            value={PBRinputs.flowRateUnit}
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
            value={PBRinputs.reactionRateUnit}
            onChange={oninputchange}
          >
            <MenuItem value={"mol/kg-s"}>mol/kg-s</MenuItem>
            <MenuItem value={"mol/kg-min"}>mol/kg-min</MenuItem>
            <MenuItem value={"lb-mol/kg-min"}>lb-mol/kg-min</MenuItem>
          </Select>
        </Box>

        <Button variant="contained">Calculate Conversion</Button>
      </Box>
    </>
  );
};

export default PBR;
