import { RouteComponentProps } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SharedCollectionsStore from "../Stores/SharedCollectionsStore";
import { SharedCollection } from "../Model/SharedCollection";
import AddIcon from "@material-ui/icons/Add";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import BaseCollectionView from "./BaseCollectionView";
import { Fab } from "@material-ui/core";
import AddElementDialog from "./Dialogs/AddElementDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

type SharedCollectionViewProps = RouteComponentProps & {
  match: { params: { collectionId: number } };
};

export default function SharedCollectionView(props: SharedCollectionViewProps) {
  const classes = useStyles();
  let [
    sharedCollection,
    setSharedCollection,
  ] = useState<SharedCollection | null>(null);
  const [addElementDialogOpen, setAddElementDialogOpen] = React.useState(false);

  const toggleAddElementDialogOpen = () => {
    setAddElementDialogOpen(!addElementDialogOpen);
  };

  useEffect(() => {
    const collectionId = props.match.params.collectionId;
    setSharedCollection(
      SharedCollectionsStore.getSharedCollection(collectionId)
    );
    const changeHandler = () => {
      setSharedCollection(
        SharedCollectionsStore.getSharedCollection(collectionId)
      );
    };

    SharedCollectionsStore.addChangeListener(changeHandler);
    return () => {
      SharedCollectionsStore.removeChangeListener(changeHandler);
    };
  }, [props.match.params.collectionId]);

  return (
    <>
      <BaseCollectionView collection={sharedCollection?.collection ?? null} hasEditRights={sharedCollection?.editRights}>
        {sharedCollection?.editRights && (
          <Fab
            color="primary"
            aria-label="add"
            variant="extended"
            className={classes.fab}
            onClick={toggleAddElementDialogOpen}
          >
            <AddIcon />
            Dodaj element
          </Fab>
        )}
      </BaseCollectionView>
      <AddElementDialog
        toggleDialogOpen={toggleAddElementDialogOpen}
        open={addElementDialogOpen}
        collectionId={props.match.params.collectionId}
      />
    </>
  );
}
