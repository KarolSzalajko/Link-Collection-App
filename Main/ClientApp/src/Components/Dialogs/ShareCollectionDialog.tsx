import {
  Button, createStyles, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Theme
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { ChangeEvent, useEffect, useState } from "react";
import { shareCollection } from "../../Actions/CollectionActions";
import { SharedCollectionData } from "../../Model/SharedCollection";
import { User, UserRights } from "../../Model/User";
import UsersStore from "../../Stores/UsersStore";
import SimpleDialog from "./SimpleDialog";

type ShareCollectionDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBlockEnd: "10px",
    },
  })
);

export default function ShareCollectionDialog(
  props: ShareCollectionDialogProps
) {
  const classes = useStyles();
  const title = "Udostępnij kolekcję";
  const description = `Możesz udostępnić tę kolekcję innym użytkownikom, aby mogli ją przeglądać.
    Po udostępnieniu, kolekcja będzie widoczna w ich sekcji "Udostępnione dla mnie".`;

  const createSharedCollectionData = () => {
    return {
      collectionId: props.collectionId,
      userId: selectedUser!.id,
      editRights: !!UserRights.ViewRights,
    } as SharedCollectionData;
  };

  const [users, setUsers] = useState(UsersStore.getUsers());
  useEffect(() => {
    const changeHandler = () => {
      setUsers(UsersStore.getUsers());
    };
    UsersStore.addChangeListener(changeHandler);
    return () => UsersStore.removeChangeListener(changeHandler);
  }, []);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const onUserInputChange = (event: ChangeEvent<{}>, newUser: User | null) => {
    setSelectedUser(newUser);
  };

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      content={
        <Autocomplete
          options={users}
          getOptionLabel={(user) => user.email}
          id="auto-select"
          autoSelect
          value={selectedUser}
          onChange={onUserInputChange}
          renderInput={(params) => <TextField {...params} label="Użytkownik" />}
        />
      }
      actions={
        <Button
          disabled={selectedUser === null}
          onClick={() => {
            shareCollection(createSharedCollectionData());
            props.toggleDialogOpen();
          }}
          color="primary"
          autoFocus
        >
          Udostępnij
        </Button>
      }
    ></SimpleDialog>
  );
}
