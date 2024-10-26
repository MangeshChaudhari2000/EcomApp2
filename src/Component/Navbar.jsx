import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DrawerComp from "./DrawerComp";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Initialize the value state to 0 to match the first Tab
  const [value, setValue] = useState(0); // Change made here
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AppBar>
        <Toolbar>
          {isMobile ? (
            <>
              <DrawerComp /> <ShoppingBagIcon color="inherit" />
              <Typography sx={{ marginLeft: "10px" }}>Ecommerce App</Typography>
            </>
          ) : (
            <>
              <ShoppingBagIcon color="inherit" />
              <Typography sx={{ marginLeft: "10px" }}>Ecommerce App</Typography>
              <Tabs
                textColor="inherit"
                sx={{ marginLeft: "auto" }}
                value={value}
                onChange={(e, value) => setValue(value)}
                indicatorColor="secondary"
              >
                <Tab label="Products" component={Link} to="/"></Tab>
                <Tab label="Add Products" component={Link} to="/addPage"></Tab>
                <Tab label="Cart" component={Link} to="/myCart"></Tab>

              </Tabs>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
