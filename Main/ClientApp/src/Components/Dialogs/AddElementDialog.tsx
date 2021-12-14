import { Button, TextField } from "@material-ui/core";
import React from "react";
import { addElement } from "../../Actions/ElementActions";
import { ElementCreationData } from "../../Model/Element";
import SimpleDialog from "./SimpleDialog";

type AddElementDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
};

export default function AddElementDialog(props: AddElementDialogProps) {
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleNameChange = (newName: string) => {
    setName(newName);
  };

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };

  const createElementData = (name: string, url: string, description: string) => {
    return {
      collectionId: props.collectionId,
      name: name,
      link: url,
      description: description
    } as ElementCreationData;
  };

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title="Dodaj Element"
      description="Wprowadź nazwę, adres url i opis nowego elementu. Możesz później zmienić ustawienia dla tego elementu."
      content={
        <>
          <TextField
            onChange={(e) => handleNameChange(e.target.value)}
            autoFocus
            margin="dense"
            id="elementName"
            label="Nazwa"
            type="email"
            placeholder="Mój element"
            fullWidth
          />
          <TextField
            onChange={(e) => handleUrlChange(e.target.value)}
            autoFocus
            margin="dense"
            id="elementUrl"
            label="Url"
            type="email"
            placeholder="Link do mojego elementu"
            fullWidth
          />
          <TextField
            onChange={(e) => handleDescriptionChange(e.target.value)}
            autoFocus
            margin="dense"
            id="elementDescription"
            label="Opis"
            type="text"
            placeholder="Opis"
            fullWidth
          />
        </>
      }
      actions={
        <Button
          disabled={url.length === 0 || name.length === 0}
          onClick={() => {
            addElement(createElementData(name, url, description));
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
