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
const PFR = () => {
  const [PFRInputs, setPFRInputs] = useState({
    volume: -1,
    volumeUnit: "m3",
    flowRate: -1,
    flowRateUnit: "mol/Ls",
    reactionRate: "",
    reactionRateUnit: "mol/s",
    conversion: -1,
  });
  const oninputchange = (e) => {
    if (e.target.value === "") {
      setPFRInputs({ ...PFRInputs, [e.target.name]: -1 });
    } else {
      setPFRInputs({ ...PFRInputs, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = () => {
    if (PFRInputs.volume === -1 || PFRInputs.flowRate === -1) {
      axios
        .post("/PFR_volume", PFRInputs)
        .then((response) => {
          setPFRInputs({
            ...PFRInputs,
            [response.data.unknown]: response.data.result,
          });
          setshowresults(true);
        })
        .catch((error) => {
          console.error("Error calculating sum:", error);
        });
    }
  };
  const [showresults, setshowresults] = useState(false);

  return (
    <>
      {!showresults && (
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
              placeholder="eg. (1-x)"
              required
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
          <Box className="InputFields">
            <TextField
              className="conversioninputfield"
              name="conversion"
              variant="filled"
              label="conversion"
              onChange={oninputchange}
            ></TextField>
          </Box>
          <Button variant="contained" onClick={handleSubmit}>
            Calculate
          </Button>
          <Box>{PFRInputs.volume}</Box>
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
                  <TableCell>{PFRInputs.volume}</TableCell>
                  <TableCell>{PFRInputs.volumeUnit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Conversion {"(X)"}</TableCell>
                  <TableCell>{PFRInputs.conversion}</TableCell>
                  <TableCell>none</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Initial Flow Rate {"(F0)"}</TableCell>
                  <TableCell>{PFRInputs.flowRate}</TableCell>
                  <TableCell>{PFRInputs.flowRateUnit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rate of Reaction {"(r)"}</TableCell>
                  <TableCell>{PFRInputs.reactionRate}</TableCell>
                  <TableCell>{PFRInputs.reactionRateUnit}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            onClick={() => {
              setPFRInputs({
                volume: -1,
                volumeUnit: "m3",
                flowRate: -1,
                flowRateUnit: "mol/Ls",
                reactionRate: "",
                reactionRateUnit: "mol/s",
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

export default PFR;
