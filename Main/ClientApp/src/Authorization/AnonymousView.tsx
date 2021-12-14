import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

type AnonymousViewProps = {
  registerPath: string;
  loginPath: string;
};

export default function AnonymousView(props: AnonymousViewProps) {
  return (
    <Grid
      style={{ width: 300 }}
      container
      direction="row"
      justify="flex-end"
      spacing={2}
    >
      <Grid item>
        <Link
          to={props.registerPath}
          style={{ color: "white", textDecoration: "none" }}
        >
          Zarejestruj się
        </Link>
      </Grid>
      <Grid item>
        <Link
          to={props.loginPath}
          style={{ color: "white", textDecoration: "none" }}
        >
          Zaloguj się
        </Link>
      </Grid>
    </Grid>
  );
}
