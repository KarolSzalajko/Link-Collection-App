import React, { useState, ChangeEvent, useEffect } from "react";
import SimpleDialog from "./SimpleDialog";
import { updateSharedCollection } from "../../Actions/CollectionActions";
import {
  Button,
  Avatar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  Theme,
  createStyles,
  Grid,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";
import {
  SharedCollectionData,
  SharedCollection,
} from "../../Model/SharedCollection";
import SharedCollectionStore from "../../Stores/SharedCollectionsStore";
import DeleteContributorDialog from "./DeleteContributorDialog";

type EditContributorDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
  userId: number;
};

enum UserRights {
  ViewRights,
  EditRights,
}

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
  const title = "Edit contributor";
  const description = `You can change contributor permissions or delete this contributor.`;
  const [
    sharedCollection,
    setSharedCollection,
  ] = useState<SharedCollection | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserRights, setUserRights] = useState(
    sharedCollection?.editRights ? UserRights.EditRights : UserRights.ViewRights
  );

  const createSharedCollectionData = () => {
    return {
      collectionId: props.collectionId,
      userId: sharedCollection?.user.id,
      editRights: selectedUserRights === UserRights.EditRights,
    } as SharedCollectionData;
  };

  const onUserRightsChange = (event: React.ChangeEvent<{ value: any }>) => {
    setUserRights(event.target.value);
  };

  useEffect(() => {
    setSharedCollection(
      SharedCollectionStore.getContributorSharedCollection(
        props.collectionId,
        props.userId
      )
    );
    const changeHandler = () => {
      setSharedCollection(
        SharedCollectionStore.getContributorSharedCollection(
          props.collectionId,
          props.userId
        )
      );
    };

    SharedCollectionStore.addChangeListener(changeHandler);
    return () => {
      SharedCollectionStore.removeChangeListener(changeHandler);
    };
  }, [props.collectionId, props.userId, sharedCollection?.editRights]);

  return (
    <>
      <SimpleDialog
        open={props.open}
        toggleDialogOpen={props.toggleDialogOpen}
        title={title}
        description={description}
        content={
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={2}>
              <Avatar>
                <Person />
              </Avatar>
            </Grid>
            <Grid item xs={6}>
              {sharedCollection?.user.name}
            </Grid>
            <Grid item xs={4}>
              <FormControl>
                <InputLabel>Permissions</InputLabel>
                <Select
                  value={selectedUserRights}
                  onChange={onUserRightsChange}
                >
                  <MenuItem value={UserRights.ViewRights}>View Rights</MenuItem>
                  <MenuItem value={UserRights.EditRights}>Edit Rights</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        }
        actions={
          <>
            <Button
              disabled={
                (sharedCollection?.editRights &&
                  selectedUserRights == UserRights.EditRights) ||
                (!sharedCollection?.editRights &&
                  selectedUserRights == UserRights.ViewRights)
              }
              onClick={() => {
                updateSharedCollection(createSharedCollectionData());
                props.toggleDialogOpen();
              }}
              color="primary"
              autoFocus
            >
              Change
            </Button>
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
