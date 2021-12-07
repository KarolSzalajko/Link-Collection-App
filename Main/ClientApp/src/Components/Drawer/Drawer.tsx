import {
  Drawer as MaterialDrawer, List
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import UsersStore from "../../Stores/UsersStore";
import MyCollectionsSection from "./MyCollectionsSection";
import SharedSection from "./SharedSection";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
  })
);

export default function Drawer() {
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState(UsersStore.getCurrentUser());

  useEffect(() => {
    const handler = () => {
      setCurrentUser(UsersStore.getCurrentUser());
    };
    UsersStore.addChangeListener(handler);
    return () => UsersStore.removeChangeListener(handler);
  }, []);

  return (
    <MaterialDrawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <MyCollectionsSection />
        <SharedSection />
        {/* <SavedSection /> */}
      </List>
    </MaterialDrawer>
  );
}
