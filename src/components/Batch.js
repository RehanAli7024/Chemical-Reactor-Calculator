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
const Batch = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [Batchinputs, setBatchinputs] = useState({
    volume: -1,
    volumeUnit: "L",
    initialMoles: -1,
    initialMolesUnit: "mol",
    reactionRate: "",
    reactionRateUnit: "mol/Ls",
    time: -1,
    timeUnit: "s",
    conversion: -1,
  });
  const oninputchange = (e) => {
    if (e.target.value === "") {
      setBatchinputs({ ...Batchinputs, [e.target.name]: -1 });
    } else {
      setBatchinputs({ ...Batchinputs, [e.target.name]: e.target.value });
    }
  };

  const [showresults, setshowresults] = useState(false);
  const handleSubmit = () => {
    axios
      .post(`${backendURL}/batch_time`, Batchinputs)
      .then((response) => {
        setBatchinputs({
          ...Batchinputs,
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
        <Box>
          <Box id="CSTR-containor">
            <p>Leave any one of the fields unfilled to get its value.</p>
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
                onChange={oninputchange}
                value={Batchinputs.volumeUnit}
              >
                <MenuItem value={"L"}>L</MenuItem>
                <MenuItem value={"ft3"}>ft3</MenuItem>
                <MenuItem value={"cm3"}>cm3</MenuItem>
                <MenuItem value={"m3"}>m3</MenuItem>
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
              <Select
                name="timeUnit"
                labelId="timeUnits"
                onChange={oninputchange}
                value={Batchinputs.timeUnit}
              >
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
              <Select
                name="initialMolesUnit"
                labelId="moleUnits"
                onChange={oninputchange}
                value={Batchinputs.initialMolesUnit}
              >
                <MenuItem value={"mol"}>mol</MenuItem>
                <MenuItem value={"lb-mol"}>lb-mol</MenuItem>
              </Select>
            </Box>
            <Box className="InputFields">
              <TextField
                name="reactionRate"
                variant="filled"
                label="Reaction Rate"
                required
                placeholder="eg. (1-x)"
                onChange={oninputchange}
              ></TextField>
              <Select
                name="reactionRateUnit"
                labelId="ReactionRate"
                onChange={oninputchange}
                value={Batchinputs.reactionRateUnit}
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
              required
              inputProps={{ min: 0, max: 1 }}
              onChange={(e) => {
                if (e.target.value <= 1 && e.target.value >= 0) {
                  oninputchange(e);
                } else {
                  alert("please enter a value between 0 and 1");
                  e.target.value = 1;
                }
              }}
            ></TextField>
            <Button variant="contained" onClick={handleSubmit}>Calculate</Button>
          </Box>
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
                  <TableCell>{Batchinputs.volume}</TableCell>
                  <TableCell>{Batchinputs.volumeUnit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Conversion {"(X)"}</TableCell>
                  <TableCell>{Batchinputs.conversion}</TableCell>
                  <TableCell>none</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Initial Moles {"(N0)"}</TableCell>
                  <TableCell>{Batchinputs.initialMoles}</TableCell>
                  <TableCell>{Batchinputs.initialMolesUnit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rate of Reaction {"(r)"}</TableCell>
                  <TableCell>{Batchinputs.reactionRate}</TableCell>
                  <TableCell>{Batchinputs.reactionRateUnit}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Time Taken {"(t)"}</TableCell>
                  <TableCell>{Batchinputs.time}</TableCell>
                  <TableCell>{Batchinputs.timeUnit}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            onClick={() => {
              setBatchinputs({
                volume: -1,
                volumeUnit: "L",
                initialMoles: -1,
                initialMolesUnit: "mol",
                reactionRate: "",
                reactionRateUnit: "mol/Ls",
                time: -1,
                timeUnit: "s",
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

export default Batch;
