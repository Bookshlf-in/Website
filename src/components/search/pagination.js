import { useNavigate, useParams } from "react-router-dom";
import { Stack, Pagination } from "@mui/material";

const BottomPagination = ({ page = 1, totalPages }) => {
  const { query, filters } = useParams();
  const navigate = useNavigate();

  // changing Page
  const changePage = (e, pageNo) => {
    navigate(`/search/${query}/${filters}/${pageNo}`);
  };

  return (
    <Stack sx={{ padding: "15px 0px" }} spacing={2}>
      <Pagination
        shape="rounded"
        variant="outlined"
        color="warning"
        page={page}
        count={totalPages}
        onChange={changePage}
        boundaryCount={2}
        siblingCount={2}
      />
    </Stack>
  );
};

export default BottomPagination;
