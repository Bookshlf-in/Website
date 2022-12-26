import axios from "../../../axios";

export const makeRequest = (month, year, setLoad, setOrder, setFinance) => {
  setLoad(true);
  axios
    .get("/admin-getMonthOrderStats", {
      params: {
        month: month,
        year: year,
      },
    })
    .then((res) => {
      setOrder({
        placed: res.data.totalOrders,
        confirmed: res.data.confirmed,
        packed: res.data.packed,
        shipped: res.data.shipped,
        delivered: res.data.delivered,
        rto: res.data.RTO,
        returned: res.data.returned,
        lost: res.data.lost,
        cancelled: res.data.cancelled,
      });
      setFinance({
        expectedRevenue: Math.round(res.data.expectedRevenue),
        actualRevenue: Math.round(res.data.totalRevenue),
        expectedProfit: Math.round(res.data.expectedProfit),
        deliveredProfit: Math.round(res.data.DeliveredProfit),
        rtoLoss: Math.round(res.data.RTOLoss),
        actualProfit: Math.round(res.data.totalProfit),
      });
      console.log(res.data);
      setLoad(false);
    })
    .catch((err) => {
      console.log(err.response.data);
      setLoad(false);
    });
};
