import {
  IconButton,
  ListItem, ListItemIcon, ListItemText, makeStyles, Menu
} from "@material-ui/core";
import {
  AccountCircle, ExitToApp
} from "@material-ui/icons";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 2300,
  },
});

type AuthenticatedViewProps = {
  profilePath: string;
  userName: string;
  logoutPath: string;
};

export default function AuthenticatedView(props: AuthenticatedViewProps) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const openMenu = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget as Element);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Fragment>
        <Link
          className="text-dark"
          to={props.profilePath}
          style={{ color: "white", textDecoration: "none" }}
        >
          Hello {props.userName}
        </Link>
        {/*
        // @ts-ignore */}
        <IconButton color="inherit" onClick={openMenu}>
          <AccountCircle />
        </IconButton>
      </Fragment>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        className={classes.root}
      >
        <ListItem
          button
          component={Link}
          to={props.profilePath}
          onClick={closeMenu}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={props.logoutPath}
          onClick={closeMenu}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Menu>
    </>
  );
}
