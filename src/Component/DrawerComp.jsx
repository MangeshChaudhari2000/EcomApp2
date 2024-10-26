import {
  Drawer,
  IconButton,
  useMediaQuery,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";

const DrawerComp = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
        <MenuIcon />
      </IconButton>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          <ListItemButton LinkComponent={Link} to="/">
            <ListItemIcon>
              <ListItemText onClick={() => setDrawerOpen(false)}>
                Products
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton LinkComponent={Link} to="/addPage">
            <ListItemIcon>
              <ListItemText onClick={() => setDrawerOpen(false)}>
                Add Products
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton LinkComponent={Link} to="/myCart">
            <ListItemIcon>
              <ListItemText onClick={() => setDrawerOpen(false)}>
                Cart
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default DrawerComp;
