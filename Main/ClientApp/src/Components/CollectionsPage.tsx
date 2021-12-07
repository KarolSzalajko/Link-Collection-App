import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import CollectionStatsView from "./CollectionStatsView";
import CollectionView from "./CollectionView";
import PanelWideMessage from "./Common/PanelWideMessage";
import ContentWithDrawer from "./ContentWithDrawer";
import Layout from "./Layout";
import SharedCollectionView from "./SharedCollectionView";

export default function CollectionsPage(props: CollectionsSiteProps) {
  let { path, url } = useRouteMatch();
  return (
    <Layout>
      <ContentWithDrawer>
        <Route
          exact
          path={path}
          component={() => (
            <PanelWideMessage text="Wybierz kolekcję do wyświetlenia" />
          )}
        />
        <Route
          path={`${url}/shared/:collectionId`}
          component={SharedCollectionView}
        />
        <Route exact path={`${url}/:collectionId`} component={CollectionView} />
        <Route
          exact
          path={`${url}/:collectionId/stats`}
          component={CollectionStatsView}
        />
      </ContentWithDrawer>
    </Layout>
  );
}

type CollectionsSiteProps = {};
