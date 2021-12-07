import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
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
            <PanelWideMessage text="Select a collection to display" />
          )}
        />
        <Route
          path={`${url}/shared/:collectionId`}
          component={SharedCollectionView}
        />
        <Route exact path={`${url}/:collectionId`} component={CollectionView} />
      </ContentWithDrawer>
    </Layout>
  );
}

type CollectionsSiteProps = {};
