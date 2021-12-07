import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import CollectionsApi from "../Api/PublicCollectionsApi";
import { Collection } from "../Model/Collection";
import BaseCollectionView from "./BaseCollectionView";
import PanelWideMessage from "./Common/PanelWideMessage";

type PublicCollectionViewProps = RouteComponentProps & {
  match: { params: { collectionId: number } };
};

export default function PublicCollectionView(props: PublicCollectionViewProps) {
  let [collection, setCollection] = useState<Collection | null>(null);
  let [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      let collection = await CollectionsApi.getPublicCollection(
        props.match.params.collectionId
      );
      setCollection(collection);
      setIsLoaded(true);
    }
    loadData();
    return () => {};
  }, [props.match.params.collectionId]);

  //TODO: Refactor, this is unreadable
  return isLoaded === false ? (
    <PanelWideMessage withThrobber text="Proszę poczekać..." />
  ) : collection === null ? (
    <PanelWideMessage text="Kolekcja nie istnieje lub jest prywatna" />
  ) : (
    <BaseCollectionView collection={collection} />
  );
}
