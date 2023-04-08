import { Stack, Grid, Skeleton } from "@mui/material";

const CheckoutLoading = () => {
  return (
    <Grid
      container
      sx={{ padding: "15px 24px" }}
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Stack
          sx={{ width: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          <Skeleton variant="text" height={50} width={250} />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Stack
          sx={{ width: "100%" }}
          justifyContent="center"
          alignItems="center"
          spacing={1}
          direction="row"
        >
          <Skeleton variant="circular" height={25} width={25} />
          <Skeleton variant="text" width={100} />
          <Skeleton variant="circular" height={25} width={25} />
          <Skeleton variant="text" width={100} />
          <Skeleton variant="circular" height={25} width={25} />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Stack
          sx={{ width: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          <Skeleton variant="rectangular" height={300} width="100%" />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CheckoutLoading;
