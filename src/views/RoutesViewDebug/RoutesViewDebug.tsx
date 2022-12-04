import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import { routes } from "../../service/internal-routes";
import AppIcon from "../../assets/app-icon.png";

export default function RoutesViewDebug() {
  const parseObject = (obj: any) => {
    const result = [];

    for (let key in obj) {
      if (typeof obj[key] === "object") {
        for (let nestedKey in obj[key]) {
          result.push({ key: nestedKey, value: obj[key][nestedKey] });
        }
      } else {
        result.push({ key: key, value: obj[key] });
      }
    }

    return result;
  };

  const [rdata, setRData] = useState(parseObject(routes));

  return (
    <div
      style={{ position: "fixed", inset: 0, overflow: "auto" }}
      className="center"
    >
      <img
        draggable={false}
        alt=""
        src={AppIcon}
        style={{ width: 100, height: 100 }}
      />
      <pre style={{ width: "100px" }}>{process.env.NODE_ENV}</pre>
      <div style={{ width: "380px" }}>
        <TableContainer className="mb-3" component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Key:</TableCell>
                <TableCell align="right">Path Value:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rdata.map((row) => {
                return (
                  <TableRow>
                    <TableCell align="left">
                      <code style={{ color: "#424242" }}>{row.key}:</code>
                    </TableCell>
                    <TableCell align="right">
                      <code>{row.value}</code>
                    </TableCell>
                  </TableRow>
                );
              })}
              {/* {rows.map((row) => (
								<TableRow
									key={row.name}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right">{row.calories}</TableCell>
									<TableCell align="right">{row.fat}</TableCell>
									<TableCell align="right">{row.carbs}</TableCell>
									<TableCell align="right">{row.protein}</TableCell>
								</TableRow>
							))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
