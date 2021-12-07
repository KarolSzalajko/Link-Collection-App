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

  const handleNameChange = (newName: string) => {
    setName(newName);
  };

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
  };

  const createElementData = (name: string, url: string) => {
    return {
      collectionId: props.collectionId,
      name: name,
      link: url,
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
            label="Element name"
            type="email"
            placeholder="MójElement"
            fullWidth
          />
          <TextField
            onChange={(e) => handleUrlChange(e.target.value)}
            autoFocus
            margin="dense"
            id="elementDescription"
            label="Url"
            type="email"
            placeholder="Link do mojego elementu"
            fullWidth
          />
        </>
      }
      actions={
        <Button
          disabled={url.length === 0}
          onClick={() => {
            addElement(createElementData(name, url));
            props.toggleDialogOpen();
          }}
          color="primary"
          autoFocus
        >
          Add
        </Button>
      }
    />
  );
}
