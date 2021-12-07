import { Paper } from "@material-ui/core";
import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import ApiAuthorizationRoutes from "./Authorization/ApiAuthorizationRoutes";
import AuthorizeRoute from "./Authorization/AuthorizeRoute";
import CollectionsPage from "./Components/CollectionsPage";
import InfoSnackBar from "./Components/InfoSnackBar";
import PublicCollectionPage from "./Components/PublicCollectionPage";
import SpotifyCallbackPage from "./Components/SpotifyCallbackPage";
import ThemeProvider from "./Components/ThemeProvider";
import WelcomeScreen from "./Components/WelcomeScreen";

function App() {
  return (
    <ThemeProvider>
      <Paper style={{ minHeight: window.innerHeight }}>
        <ApiAuthorizationRoutes />
        <Route exact path="/" component={WelcomeScreen} />
        <AuthorizeRoute path="/collections/" component={CollectionsPage} />
        <Route path="/public/" component={PublicCollectionPage} />
        <AuthorizeRoute
          path="/spotifycallback/"
          component={SpotifyCallbackPage}
        />
        <InfoSnackBar />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
