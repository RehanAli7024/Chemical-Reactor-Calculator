import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const CSTR = () => {
  return (
    <>
      <Box id="CSTR-containor">
      <p>
        Leave any one of the fields unfilled to get its value.
      </p>
        <Box className="InputFields">
          <TextField variant="filled" label="Volume" type="number"></TextField>
          <Select labelId="VolumeUnits" value={"cm3"}>
            <MenuItem value={"cm3"}>cm3</MenuItem>
            <MenuItem value={"m3"}>m3</MenuItem>
            <MenuItem value={"L"}>L</MenuItem>
            <MenuItem value={"ft3"}>ft3</MenuItem>
          </Select>
        </Box>
        <Box className="InputFields">
          <TextField
            variant="filled"
            label="Molar Flow Rate(inlet)"
            type="number"
          ></TextField>
          <Select labelId="MolarFlowUnits" value={"mol/Ls"}>
            <MenuItem value={"mol/Ls"}>mol/Ls</MenuItem>
            <MenuItem value={"mol/Lmin"}>mol/Lmin</MenuItem>
            <MenuItem value={"lb-mol/Lmin"}>lb-mol/Lmin</MenuItem>
          </Select>
        </Box>
        <Box className="InputFields">
          <TextField
            variant="filled"
            label="Reaction Rate"
            type="number"
          ></TextField>
          <Select labelId="MolarFlowUnits" value={"mol/s"}>
            <MenuItem value={"mol/s"}>mol/s</MenuItem>
            <MenuItem value={"mol/min"}>mol/min</MenuItem>
            <MenuItem value={"lb-mol/min"}>lb-mol/min</MenuItem>
          </Select>
        </Box>
        <TextField
          className="conversioninputfield"
          variant="filled"
          label="Conversion (%)"
          type="number"
          inputProps={{ min: 0, max: 100 }}
        ></TextField>
        <Button variant="contained">Calculate</Button>
      </Box>
    </>
  );
};

export default CSTR;
