import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { CategoryModal } from "../../model/Category";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  styleIconAction: {
    "&:hover": {
      color: "#5048E5",
    },
  },
});

type Props = {
  categoryList: CategoryModal[];
  handleOpen: () => void;
  onSetCate: (cateData: CategoryModal) => void;
  onDeleteCate: (id: number) => void;
};

export const CategoryListResults = (props: Props) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const classes = useStyles();

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={200}>Id</TableCell>
                <TableCell width={200}>Name</TableCell>
                <TableCell width={200}>Image</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {props.categoryList.slice(0, limit).map((item, index) => (
                <TableRow hover key={item.categoryId}>
                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {item.categoryId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {item.categoryName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {/* <Image src={item.image} alt={item.image} width={20} height={20} /> */}
                    <Box width={60}>
                      <img src={item.image} width="100%" alt="" />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {item.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <FaEdit
                      onClick={() => {
                        props.handleOpen();
                        props.onSetCate(item);
                      }}
                      className={classes.styleIconAction}
                      style={{
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      fontSize={18}
                    />

                    <MdDelete
                      onClick={() => props.onDeleteCate(item.categoryId)}
                      className={classes.styleIconAction}
                      style={{ cursor: "pointer" }}
                      fontSize={20}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>

      <TablePagination
        component="div"
        count={props.categoryList.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CategoryListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
