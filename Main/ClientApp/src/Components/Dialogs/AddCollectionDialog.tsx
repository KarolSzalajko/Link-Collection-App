import { Button, TextField } from "@material-ui/core";
import React from "react";
import { addCollection } from "../../Actions/CollectionActions";
import { CollectionCreationData } from "../../Model/Collection";
import SimpleDialog from "./SimpleDialog";

type AddCollectionDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
};

export default function AddCollectionDialog(props: AddCollectionDialogProps) {
  const [inputText, setInputText] = React.useState("");

  const handleInputChange = (newInput: string) => {
    setInputText(newInput);
  };

  const createCollectionData = (name: string) => {
    return { isPublic: false, name: name } as CollectionCreationData;
  };

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title="Dodaj kolekcję"
      description="  Wprowadź nazwę kolekcji. Możesz później zmienieć ustawienia dla tej kolekcji."
      content={
        <TextField
          onChange={(e) => handleInputChange(e.target.value)}
          autoFocus
          margin="dense"
          id="collectionName"
          label="Nazwa kolekcji"
          type="email"
          placeholder="Moja kolekcja"
          fullWidth
        />
      }
      actions={
        <Button
          disabled={inputText.length === 0}
          onClick={() => {
            addCollection(createCollectionData(inputText));
            props.toggleDialogOpen();
          }}
          color="primary"
          autoFocus
        >
          Dodaj
        </Button>
      }
    />
  );
}
