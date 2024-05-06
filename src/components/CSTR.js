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

const CSTR = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [CSTRinputs, setCSTRinputs] = useState({
    reactorType: "CSTR",
    volume: -1,
    volumeUnit: "L",
    flowRate: -1,
    flowRateUnit: "mol/s",
    reactionRate: -1,
    reactionRateUnit: "mol/Ls",
    conversion: -1,
  });

  const oninputchange = (e) => {

    if (e.target.value === "") {
      setCSTRinputs({ ...CSTRinputs, [e.target.name]: -1 });
    } else {
      setCSTRinputs({ ...CSTRinputs, [e.target.name]: e.target.value });
    }
  };
  const [showresults, setshowresults] = useState(false);
  const handleSubmit = () => {
    axios
      .post(`${backendURL}/CSTR_conversion`, CSTRinputs)
      .then((response) => {
        setCSTRinputs({
          ...CSTRinputs,
          [response.data.unknown]: response.data.result,
        });
        setshowresults(true);
      })
      .catch((error) => {
        console.error("Error calculating sum:", error);
      });
  };
  return (
    <>
      {!showresults && (
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
              <MenuItem value={"L"}>L</MenuItem>
              <MenuItem value={"ft3"}>ft3</MenuItem>
              <MenuItem value={"cm3"}>cm3</MenuItem>
              <MenuItem value={"m3"}>m3</MenuItem>
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
              type="number"
              onChange={oninputchange}
            ></TextField>
            <Select
              name="reactionRateUnit"
              labelId="MolarFlowUnits"
              value={CSTRinputs.reactionRateUnit}
              onChange={oninputchange}
            >
              <MenuItem value={"mol/Ls"}>mol/Ls</MenuItem>
              <MenuItem value={"mol/Lmin"}>mol/Lmin</MenuItem>
              <MenuItem value={"lb-mol/Lmin"}>lb-mol/Lmin</MenuItem>
            </Select>
          </Box>
          <TextField
            name="conversion"
            className="conversioninputfield"
            variant="filled"
            label="Conversion"
            type="number"
            inputProps={{ min: 0, max: 1 }}
            onChange={(e)=>{
              if(e.target.value <= 1 && e.target.value >= 0){
                oninputchange(e)
              }
              else{
                alert("please enter a value between 0 and 1")
                e.target.value = 1
              }
            }}
          ></TextField>
          <Button variant="contained" onClick={handleSubmit}>
            Calculate
          </Button>
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
                  <TableCell>Volume {"(V)"}</TableCell>
                  <TableCell>{CSTRinputs.volume}</TableCell>
                  <TableCell>{CSTRinputs.volumeUnit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Conversion {"(X)"}</TableCell>
                  <TableCell>{CSTRinputs.conversion}</TableCell>
                  <TableCell>none</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Initial Flow Rate {"(F0)"}</TableCell>
                  <TableCell>{CSTRinputs.flowRate}</TableCell>
                  <TableCell>{CSTRinputs.flowRateUnit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rate of Reaction {"(r)"}</TableCell>
                  <TableCell>{CSTRinputs.reactionRate}</TableCell>
                  <TableCell>{CSTRinputs.reactionRateUnit}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            onClick={() => {
              setCSTRinputs({
                reactorType: "CSTR",
                volume: -1,
                volumeUnit: "L",
                flowRate: -1,
                flowRateUnit: "mol/s",
                reactionRate: -1,
                reactionRateUnit: "mol/Ls",
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

export default CSTR;
