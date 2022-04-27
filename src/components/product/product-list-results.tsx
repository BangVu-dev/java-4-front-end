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
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { makeStyles } from "@mui/styles";
import { ProductModal, ProductWithDetail } from "../../model/Product";

const useStyles = makeStyles({
  styleIconAction: {
    "&:hover": {
      color: "#5048E5",
    },
  },
});

type Props = {
  productList: ProductWithDetail[];
  handleOpen: () => void;
  onSetPro: (proData: ProductModal) => void;
  onDeletePro: (id: number) => void;
};

export const ProductListResults = (props: Props) => {  
  const [limit, setLimit] = useState(5);
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
                <TableCell>Id</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {props.productList.slice(page * limit, page * limit + limit).map((item, index) => (
                <TableRow hover key={index}>
                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {item.productId}
                    </Typography>                    
                  </TableCell>

                  <TableCell>                    
                    <Box width={60}>
                      <img src={item.image} width="100%" alt="" />
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {item.productName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {item.price}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {item.categoryName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {item.description}
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="center">
                    <FaEdit
                      onClick={
                        () => {
                        props.handleOpen();
                        props.onSetPro(item)
                      }}
                      className={classes.styleIconAction}
                      style={{
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      fontSize={18}
                    />

                    <MdDelete
                      onClick={() => props.onDeletePro(item.productId)}
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
        count={props.productList.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProductListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
