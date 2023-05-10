import { useState, useEffect } from "react";

// MUI Components
import { Stack, Divider, Typography, Chip, Paper } from "@mui/material";
import { TextField, MenuItem, Button, CircularProgress } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

// Theme
//---- fonts
import { DMsans } from "../../../../assets/Theme/fonts";

// Utils
import { currentDate } from "../../../../assets/utils/dates/currentDate";

// apex charts
import Chart from "react-apexcharts";

// Methods
import { makeRequest } from "../../../../service/AdminPanel/Analytics/OrdersAnalytics";

const OrderStatsTable = ({
  placed,
  confirmed,
  packed,
  shipped,
  delivered,
  rto,
  returned,
  lost,
  cancelled,
}) => {
  return (
    <Table sx={{ minWidth: 250 }} aria-label="current month order stats">
      <TableHead>
        <TableRow>
          <TableCell>Order Category</TableCell>
          <TableCell align="right">Quantity</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Placed</TableCell>
          <TableCell align="right">{placed}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Confirmed</TableCell>
          <TableCell align="right">{confirmed}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Packed</TableCell>
          <TableCell align="right">{packed}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Shipped</TableCell>
          <TableCell align="right">{shipped}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Delivered</TableCell>
          <TableCell align="right">{delivered}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>RTO</TableCell>
          <TableCell align="right">{rto}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Returned</TableCell>
          <TableCell align="right">{returned}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Lost</TableCell>
          <TableCell align="right">{lost}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Cancelled</TableCell>
          <TableCell align="right">{cancelled}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const FinanceStatsTable = ({
  expectedRevenue = 0,
  actualRevenue = 0,
  expectedProfit = 0,
  deliveredProfit = 0,
  rtoLoss = 0,
  actualProfit = 0,
}) => {
  const Price = ({ amt, color = "black" }) => {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Typography>₹</Typography>
        <Typography color={color}>{amt | 0}</Typography>
      </Stack>
    );
  };
  return (
    <Table sx={{ minWidth: 250 }} aria-label="current month order stats">
      <TableHead>
        <TableRow>
          <TableCell>Finance Category</TableCell>
          <TableCell align="right">Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Expected Revenue</TableCell>
          <TableCell align="right">
            <Price amt={expectedRevenue} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Actual Revenue</TableCell>
          <TableCell align="right">
            <Price amt={actualRevenue} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Expected Profit</TableCell>
          <TableCell align="right">
            <Price amt={expectedProfit} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Delivered Profit</TableCell>
          <TableCell align="right">
            <Price amt={deliveredProfit} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Loss from RTO</TableCell>
          <TableCell align="right">
            <Price amt={rtoLoss} color="error" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Actual Profit</TableCell>
          <TableCell align="right">
            <Price amt={actualProfit} color="primary" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const FinanceChart = ({ categories, data }) => {
  const chartProps = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        type: "category",
        categories: categories,
      },
      yaxis: {
        tickAmount: 10,
        labels: {
          formatter: function (value) {
            return "₹ " + value;
          },
        },
      },
      annotations: {
        yaxis: [
          {
            y: 10000,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                color: "#fff",
                background: "#00E396",
              },
              text: "Good Earnings",
            },
          },
        ],
      },
    },
    series: [
      {
        name: "finance",
        data: data,
      },
    ],
  };

  return (
    <Chart
      options={chartProps.options}
      series={chartProps.series}
      type="bar"
      width="450"
      height="400"
    />
  );
};

const OrdersAnalytics = () => {
  const { date, day, dayName, month, monthName, year } = currentDate();

  const [currOrderStats, setCurrOrderStats] = useState({});
  const [currStatsLoad, setCurrStatsLoad] = useState(false);
  const [currFinanceStats, setCurrFinanceStats] = useState({});

  const [orderStats, setOrderStats] = useState({});
  const [financeStats, setFinanceStats] = useState({});
  const [orderLoad, setOrderLoad] = useState(false);

  const [newDate, setNewDate] = useState({
    month: month,
    year: year,
  });

  useEffect(() => {
    makeRequest(
      month + 1,
      year,
      setCurrStatsLoad,
      setCurrOrderStats,
      setCurrFinanceStats
    );
  }, []);

  return (
    <Stack
      spacing={1}
      divider={<Divider orientation="horizontal" flexItem />}
      sx={{ padding: "10px 0px" }}
    >
      <Typography variant="h4" sx={{ fontFamily: DMsans, padding: "0px 10px" }}>
        Orders Detailed Analytics
      </Typography>
      <Typography variant="h6" sx={{ fontFamily: DMsans, padding: "0px 10px" }}>
        Current Month : {monthName + " " + year}{" "}
        <Chip color="success" label="Ongoing" size="small" />
      </Typography>
      <Stack direction="row" spacing={2} sx={{ padding: "10px" }}>
        <Paper>
          <Stack spacing={1} sx={{ padding: "10px 24px" }} alignItems="center">
            <Chip label="Orders" />
            {currStatsLoad ? (
              <CircularProgress size={15} />
            ) : (
              <OrderStatsTable {...currOrderStats} />
            )}
          </Stack>
        </Paper>
        <Paper>
          <Stack spacing={1} alignItems="center" sx={{ padding: "10px 24px" }}>
            <Chip label="Finance" />
            {currStatsLoad ? (
              <CircularProgress size={15} />
            ) : (
              <FinanceStatsTable {...currFinanceStats} />
            )}
          </Stack>
        </Paper>
        <FinanceChart
          categories={["Revenue", "Profit", "RTO Loss", "Final Earning"]}
          data={
            currFinanceStats.expectedRevenue
              ? [
                  currFinanceStats.actualRevenue,
                  currFinanceStats.deliveredProfit,
                  -1 * currFinanceStats.rtoLoss,
                  currFinanceStats.actualProfit,
                ]
              : [0, 0, 0, 0]
          }
        />
      </Stack>
      <Typography variant="h6" sx={{ fontFamily: DMsans, padding: "0px 10px" }}>
        Get Past Months Analytics{"  "}
        <Chip color="warning" label="Past" size="small" />
      </Typography>
      <Stack direction="row" spacing={2} sx={{ padding: "10px" }}>
        <TextField
          select
          size="small"
          label="Select Month"
          value={newDate.month}
          onChange={(e) => {
            setNewDate({ ...newDate, month: e.target.value });
          }}
          sx={{ minWidth: 300 }}
        >
          <MenuItem value={0}>Jan</MenuItem>
          <MenuItem value={1}>Feb</MenuItem>
          <MenuItem value={2}>Mar</MenuItem>
          <MenuItem value={3}>Apr</MenuItem>
          <MenuItem value={4}>May</MenuItem>
          <MenuItem value={5}>Jun</MenuItem>
          <MenuItem value={6}>Jul</MenuItem>
          <MenuItem value={7}>Aug</MenuItem>
          <MenuItem value={8}>Sep</MenuItem>
          <MenuItem value={9}>Oct</MenuItem>
          <MenuItem value={10}>Nov</MenuItem>
          <MenuItem value={11}>Dec</MenuItem>
        </TextField>
        <TextField
          select
          size="small"
          label="Select Month"
          value={newDate.year}
          onChange={(e) => {
            setNewDate({ ...newDate, year: e.target.value });
          }}
          sx={{ minWidth: 300 }}
        >
          <MenuItem value={year - 3}>{year - 3}</MenuItem>
          <MenuItem value={year - 2}>{year - 2}</MenuItem>
          <MenuItem value={year - 1}>{year - 1}</MenuItem>
          <MenuItem value={year}>{year}</MenuItem>
        </TextField>
        <Button
          variant="outlined"
          size="small"
          disabled={orderLoad}
          endIcon={orderLoad ? <CircularProgress size={12} /> : null}
          onClick={() => {
            makeRequest(
              newDate.month + 1,
              newDate.year,
              setOrderLoad,
              setOrderStats,
              setFinanceStats
            );
          }}
        >
          Get Stats
        </Button>
      </Stack>
      {orderStats.placed && (
        <Stack direction="row" spacing={2} sx={{ padding: "10px" }}>
          <Paper>
            <Stack
              spacing={1}
              sx={{ padding: "10px 24px" }}
              alignItems="center"
            >
              <Chip label="Orders" />
              {currStatsLoad ? (
                <CircularProgress size={15} />
              ) : (
                <OrderStatsTable {...orderStats} />
              )}
            </Stack>
          </Paper>
          <Paper>
            <Stack
              spacing={1}
              alignItems="center"
              sx={{ padding: "10px 24px" }}
            >
              <Chip label="Finance" />
              {currStatsLoad ? (
                <CircularProgress size={15} />
              ) : (
                <FinanceStatsTable {...financeStats} />
              )}
            </Stack>
          </Paper>
          <FinanceChart
            categories={["Revenue", "Profit", "RTO Loss", "Final Earning"]}
            data={
              financeStats.expectedRevenue
                ? [
                    financeStats.actualRevenue,
                    financeStats.deliveredProfit,
                    -1 * financeStats.rtoLoss,
                    financeStats.actualProfit,
                  ]
                : [0, 0, 0, 0]
            }
          />
        </Stack>
      )}
    </Stack>
  );
};

export default OrdersAnalytics;
