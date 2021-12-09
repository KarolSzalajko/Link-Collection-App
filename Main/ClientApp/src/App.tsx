import { Paper } from "@material-ui/core";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import "./App.css";
import ApiAuthorizationRoutes from "./Authorization/ApiAuthorizationRoutes";
import AuthorizeRoute from "./Authorization/AuthorizeRoute";
import CollectionsPage from "./Components/CollectionsPage";
import InfoSnackBar from "./Components/InfoSnackBar";
import PublicCollectionPage from "./Components/PublicCollectionPage";

function App() {
  return (
    <Paper style={{ minHeight: window.innerHeight }}>
      <ApiAuthorizationRoutes />
      <Route exact path="/">
        <Redirect to="/collections/" />
      </Route>
      <AuthorizeRoute path="/collections/" component={CollectionsPage} />
      <Route path="/public/" component={PublicCollectionPage} />        
      <InfoSnackBar />
    </Paper>
  );
}

export default App;
