import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";


const Batch = () => {
  const [Batchinputs, setBatchinputs] = useState({
    volume : -1,
    volumeUnit: 'm3',
    initialMoles: -1,
    initialMolesUnit: 'mol',
    reactionRate: "",
    reactionRateUnit: "mol/s",
    time: -1,
    timeUnit: "s"
  });
  const oninputchange = (e) => {
    setBatchinputs({ ...Batchinputs, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Box>
        <Box id="CSTR-containor">
          <Box className="InputFields">
            <TextField
              name="volume"
              variant="filled"
              label="Volume"
              type="number"
              onChange={oninputchange}
            ></TextField>
            <Select name="volumeUnit" labelId="VolumeUnits" onChange={oninputchange} value={Batchinputs.volumeUnit}>
              <MenuItem value={"cm3"}>cm3</MenuItem>
              <MenuItem value={"m3"}>m3</MenuItem>
              <MenuItem value={"L"}>L</MenuItem>
              <MenuItem value={"ft3"}>ft3</MenuItem>
            </Select>
          </Box>
          <Box className="InputFields">
            <TextField
              name="time"
              variant="filled"
              label="time"
              type="number"
              onChange={oninputchange}
            ></TextField>
            <Select name="timeUnit" labelId="timeUnits" onChange={oninputchange} value={Batchinputs.timeUnit}>
              <MenuItem value={"s"}>s</MenuItem>
              <MenuItem value={"min"}>min</MenuItem>
              <MenuItem value={"hr"}>hr</MenuItem>
              
            </Select>
          </Box>
          <Box className="InputFields">
            <TextField
              name="initialMoles"
              variant="filled"
              label="Initial number of moles"
              type="number"
              onChange={oninputchange}
            ></TextField>
            <Select name="initialMolesUnit" labelId="moleUnits" onChange={oninputchange} value={Batchinputs.initialMolesUnit}>
              <MenuItem value={"mol"}>mol</MenuItem>
              <MenuItem value={"lb-mol"}>lb-mol</MenuItem>
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
            <Select name="reactionRateUnit" labelId="ReactionRate" onChange={oninputchange} value={Batchinputs.reactionRateUnit}>
              <MenuItem value={"mol/s"}>mol/s</MenuItem>
              <MenuItem value={"mol/min"}>mol/min</MenuItem>
              <MenuItem value={"lb-mol/min"}>lb-mol/min</MenuItem>
            </Select>
          </Box>

          <Button variant="contained">Calculate Conversion</Button>
        </Box>
      </Box>
    </>
  );
};

export default Batch;
