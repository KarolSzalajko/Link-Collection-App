import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { ReactNode } from "react";
import { LoginMenu } from "../Authorization/LoginMenu";
import AppBar from "./Common/AppBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar
  })
);

type LayoutPropTypes = {
  children: ReactNode;
};

export default function Layout(props: LayoutPropTypes) {
  const classes = useStyles();
  return (
    <div>
      <AppBar title={"Schowek"} rightSideMenu={<LoginMenu />} />
      <div className={classes.toolbar} />
      {props.children}
    </div>
  );
}
