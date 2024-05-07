import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import axios from "axios";
const PBR = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [PBRinputs, setPBRinputs] = useState({
    weight: -1,
    weightUnit: "kg",
    flowRate: -1,
    flowRateUnit: "mol/s",
    reactionRate: "",
    reactionRateUnit: "mol/kg-s",
    conversion: -1,
  });
  const oninputchange = (e) => {
    setPBRinputs({ ...PBRinputs, [e.target.name]: e.target.value });
  };
  const [showresults, setshowresults] = useState(false);
  const handleSubmit = () => {
    if (PBRinputs.weight === -1 || PBRinputs.flowRate === -1) {
      axios
        .post(`${backendURL}/PBR_volume`, PBRinputs)
        .then((response) => {
          setPBRinputs({
            ...PBRinputs,
            [response.data.unknown]: response.data.result,
          });
          setshowresults(true);
        })
        .catch((error) => {
          console.error("Error calculating :", error);
        });
    }
  };

  return (
    <>
      {!showresults && (
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
              <MenuItem value={"mol/s"}>mol/s</MenuItem>
              <MenuItem value={"mol/min"}>mol/min</MenuItem>
              <MenuItem value={"lb-mol/min"}>lb-mol/min</MenuItem>
            </Select>
          </Box>
          <Box className="InputFields">
            <TextField
              name="reactionRate"
              variant="filled"
              label="Reaction Rate"
              placeholder="eg. 1-x"
              required
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
          <Box className="InputFields">
            <TextField
              className="conversioninputfield"
              name="conversion"
              variant="filled"
              label="conversion"
              onChange={(e)=>{
                if(e.target.value > 1 || e.target.value < 0){
                  alert("Invalid Value")
                }
                else{
                  oninputchange(e)
                }
              }}
            ></TextField>
          </Box>
          <Button variant="contained" onClick={handleSubmit}>Calculate</Button>
        </Box>
      )}
      {showresults && (
        <Box className="outputContainor">
          <Box>The Final Parameters for your Reactor are as follows</Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Parameter</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Unit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Wieght {"(W)"}</TableCell>
                  <TableCell>{PBRinputs.weight >= 0 ? PBRinputs.weight : "undefined"}</TableCell>
                  <TableCell>{PBRinputs.weightUnit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Conversion {"(X)"}</TableCell>
                  <TableCell>{PBRinputs.conversion}</TableCell>
                  <TableCell>none</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Initial Flow Rate {"(F0)"}</TableCell>
                  <TableCell>{PBRinputs.flowRate >= 0 ? PBRinputs.flowRate : "undefined"}</TableCell>
                  <TableCell>{PBRinputs.flowRateUnit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rate of Reaction {"(r)"}</TableCell>
                  <TableCell>{PBRinputs.reactionRate  }</TableCell>
                  <TableCell>{PBRinputs.reactionRateUnit}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            onClick={() => {
              setPBRinputs({
                weight: -1,
                weightUnit: "kg",
                flowRate: -1,
                flowRateUnit: "mol/s",
                reactionRate: "",
                reactionRateUnit: "mol/kg-s",
                conversion: -1,
              });
              setshowresults(false);
            }}
          >
            Back
          </Button>
        </Box>
      )}
    </>
  );
};

export default PBR;
