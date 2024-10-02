import React from "react";
import { Sheet, Switch, Table } from "@mui/joy";
import useBusRoutes from "@hooks/useBusRoutes";
import RowMenu from "./component/RowMenu";

const LaptopTable: React.FC = () => {
  const { listOfBusRoutes: routes, toggleBusRouteActive } = useBusRoutes();

  return (
    <Sheet
      className="OrderTableContainer"
      variant="outlined"
      sx={{
        display: { xs: "none", sm: "initial" },
        width: "100%",
        borderRadius: "sm",
        flexShrink: 1,
        overflow: "auto",
        minHeight: 0,
      }}
    >
      <Table
        aria-labelledby="tableTitle"
        stickyHeader
        hoverRow
        sx={{
          "--TableCell-headBackground": "var(--joy-palette-background-level1)",
          "--Table-headerUnderlineThickness": "1px",
          "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
          "--TableCell-paddingY": "4px",
          "--TableCell-paddingX": "8px",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 35, textAlign: "center", padding: "12px 6px" }}>
              #
            </th>
            <th style={{ textAlign: "center", padding: "12px 6px" }}>
              Route Name
            </th>
            <th
              style={{ width: 200, textAlign: "center", padding: "12px 6px" }}
            >
              Departure Location
            </th>
            <th
              style={{ width: 200, textAlign: "center", padding: "12px 6px" }}
            >
              Destination Location
            </th>
            <th style={{ width: 60, textAlign: "center", padding: "12px 6px" }}>
              KM
            </th>
            <th style={{ width: 60, textAlign: "center", padding: "12px 6px" }}>
              hr
            </th>
            <th style={{ textAlign: "center", padding: "12px 6px" }}>
              Price (ticket)
            </th>
            <th style={{ textAlign: "center", padding: "12px 6px" }}>Active</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {routes &&
            routes.map((route, index) => (
              <tr key={route.id}>
                <td>{index + 1}</td>
                <td>{route.routeName}</td>
                <td>{route.startLocation}</td>
                <td>{route.endLocation}</td>
                <td>{route.distanceInKm}</td>
                <td>{route.durationInHours}</td>
                <td>{route.price}</td>
                <td>
                  <Switch
                    checked={route.active}
                    onChange={(event) =>
                      toggleBusRouteActive(
                        route.id as string,
                        event.target.checked
                      )
                    }
                  />
                </td>
                <td>
                  <RowMenu routeId={route.id as string} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default LaptopTable;
