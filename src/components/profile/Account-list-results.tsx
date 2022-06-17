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
import { UserModal } from "../../model/User";

const useStyles = makeStyles({
  styleIconAction: {
    "&:hover": {
      color: "#5048E5",
    },
  },
});

type Props = {
  accountList: UserModal[];
  handleOpen: () => void;
  onSetAccount: (accountData: UserModal) => void;
  onDeleteAccount: (id: number) => void;
};

export const AccountListResults = (props: Props) => {
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
                <TableCell width={200}>Id</TableCell>
                <TableCell width={200}>Username</TableCell>
                <TableCell width={200}>Password</TableCell>
                <TableCell>Email</TableCell>
                <TableCell width={200}>Role</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {props.accountList.slice(page * limit, page * limit + limit).map((item, index) => (
                <TableRow hover key={item.userId}>
                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {item.userId}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {item.userName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {item.password}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {item.email}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textPrimary" variant="body1">
                      {item.role}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <FaEdit
                      onClick={() => {
                        props.handleOpen();
                        props.onSetAccount(item);
                      }}
                      className={classes.styleIconAction}
                      style={{
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      fontSize={18}
                    />

                    <MdDelete
                      onClick={() => props.onDeleteAccount(item.userId)}
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
        count={props.accountList.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

// AccountListResults.propTypes = {
//   customers: PropTypes.array.isRequired,
// };
