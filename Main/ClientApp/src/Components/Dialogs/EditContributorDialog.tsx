import {
  Avatar, Button, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Theme
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { changeContributorRights } from "../../Actions/CollectionActions";
import {
  SharedCollection, SharedCollectionData
} from "../../Model/SharedCollection";
import { UserRights } from "../../Model/User";
import SharedCollectionStore from "../../Stores/SharedCollectionsStore";
import DeleteContributorDialog from "./DeleteContributorDialog";
import SimpleDialog from "./SimpleDialog";

type EditContributorDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
  userId: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBlockEnd: "10px",
    },
  })
);

export default function EditContributorDialog(
  props: EditContributorDialogProps
) {
  const classes = useStyles();
  const title = "Edytuj współtwórcę";
  const description = `Możesz zmienić uprawnienia współtwórcy lub go usunąć.`;
  const [
    sharedCollection,
    setSharedCollection,
  ] = useState<SharedCollection | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserRights, setSelectedUserRights] = useState(
    UserRights.ViewRights
  );

  const createSharedCollectionData = () => {
    return {
      collectionId: props.collectionId,
      userId: sharedCollection?.user.id,
      editRights: !!UserRights.ViewRights,
    } as SharedCollectionData;
  };

  useEffect(() => {
    const changeHandler = () => {
      let sc = SharedCollectionStore.getSharedCollectionRelatedToCollection(
        props.collectionId,
        props.userId
      );
      setSharedCollection(sc);
      setSelectedUserRights(
        sc?.editRights === true ? UserRights.EditRights : UserRights.ViewRights
      );
    };

    changeHandler();

    SharedCollectionStore.addChangeListener(changeHandler);
    return () => {
      SharedCollectionStore.removeChangeListener(changeHandler);
    };
  }, [props.collectionId, props.userId]);

  return (
    <>
      <SimpleDialog
        open={props.open}
        toggleDialogOpen={props.toggleDialogOpen}
        title={title}
        description={description}
        content={
          <Grid
            container
            spacing={3}
            alignItems="center"
            className={classes.root}
          >
            <Grid item>
              <Avatar>
                {sharedCollection?.user.name.toUpperCase().charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs={7}>
              {sharedCollection?.user.name}
            </Grid>
          </Grid>
        }
        actions={
          <>
            <Button
              onClick={() => {
                setDeleteDialogOpen(true);
                props.toggleDialogOpen();
              }}
              color="secondary"
              autoFocus
            >
              Delete
            </Button>
          </>
        }
      />
      <DeleteContributorDialog
        open={deleteDialogOpen}
        toggleDialogOpen={() => setDeleteDialogOpen(!deleteDialogOpen)}
        collectionId={props.collectionId}
        userId={props.userId}
        additionalCancelAction={() => props.toggleDialogOpen()}
      />
    </>
  );
}
