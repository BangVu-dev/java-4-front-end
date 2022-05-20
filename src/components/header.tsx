import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { UserCreateContext } from "../context/UserContext";
import Badge, { BadgeProps } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { CartCreateContext } from "../context/CartContext";

const Search = styled("div")(({ theme }) => ({
  borderRadius: "5px",
  position: "relative",
  backgroundColor: "#ffffff",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#3F3F3F",
  fontWeight: 400,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "32ch",
    },
  },
}));

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Header() {
  const { userInfo, changeUserInfo } = useContext(UserCreateContext);
  const { cartList, onLoadCart } = useContext(CartCreateContext);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogOut = () => {
    localStorage.removeItem("userInfo");
    changeUserInfo();
    toast.success("Logout successfully!", {
      position: "bottom-left",
      autoClose: 1500,
    });
    onLoadCart();
  };

  return (
    <Grid maxWidth={1200} margin={"auto"} container>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: "20px 0" }}
      >
        <Link href={"/"}>
          <a>
            <Image src="/img/Logo_NK.svg" alt="Picture of the author" width={250} height={50} />
          </a>
        </Link>

        <Grid width={400}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Bạn cần tìm gì hôm nay?"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Grid>

        <Link href={"/cart"}>
          <Grid sx={{ cursor: "pointer" }}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={cartList.length} sx={{ color: "#ffffff" }}>
                  <ShoppingCartIcon sx={{ color: "#fff" }} />
                </StyledBadge>
              </IconButton>

              <Typography ml={1} fontSize={14} color="#ffffff">
                Giỏ hàng
              </Typography>
            </Grid>
          </Grid>
        </Link>

        <Grid sx={{ cursor: "pointer" }} onClick={handleClick}>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <FaRegUserCircle color="#ffffff" fontSize={24} />

            <Typography ml={0.5} fontSize={14} color="#ffffff">
              {userInfo.userName !== "" ? userInfo.userName : "Tài khoản"}
            </Typography>
          </Grid>
        </Grid>

        <Menu
          sx={{ mt: 1 }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            {userInfo.userName !== "" ? (
              <Link href={"/profile"}>
                <Typography>Profile</Typography>
              </Link>
            ) : (
              <Link href={"/login"}>
                <Typography>Sign in</Typography>
              </Link>
            )}
          </MenuItem>
          {userInfo.userName !== "" ? (
            <Link href={"/orders"}>
              <MenuItem onClick={handleClose}>Order list</MenuItem>
            </Link>
          ) : (
            ""
          )}
          <MenuItem
            onClick={() => {
              userInfo.userName !== "" ? onLogOut() : "";
              handleClose();
            }}
          >
            {userInfo.userName !== "" ? (
              "Logout"
            ) : (
              <Link href={"/register"}>
                <Typography>Sign up</Typography>
              </Link>
            )}
          </MenuItem>
        </Menu>

        <Grid>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <FiPhoneCall color="#ffffff" fontSize={24} />

            <Typography fontWeight={600} color="#ffffff" ml={1} fontSize={14} lineHeight={1.2}>
              Hotline: 1800 6800 (Miễn phí) <br />{" "}
              <span style={{ fontSize: 12 }}>Mua hàng - Góp ý - Bảo hành</span>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
