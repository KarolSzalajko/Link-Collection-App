import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { updateCollection } from "../../Actions/CollectionActions";
import { Collection, CollectionUpdateData } from "../../Model/Collection";
import CollectionsStore from "../../Stores/CollectionsStore";
import SimpleDialog from "./SimpleDialog";

type EditCollectionDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
};

export default function EditCollectionDialog(props: EditCollectionDialogProps) {
  const title = "Edytuj kolekcję";
  const description = "Wpisz nową nazwę dla tej kolekcji.";
  let [collection, setCollection] = useState<Collection | null>(null);
  const [inputText, setInputText] = React.useState("");

  const createCollectionUpdateData = () => {
    return {
      name: inputText,
    } as CollectionUpdateData;
  };

  useEffect(() => {
    setCollection(CollectionsStore.getCollection(props.collectionId));
    const changeHandler = () => {
      setCollection(CollectionsStore.getCollection(props.collectionId));
    };

    CollectionsStore.addChangeListener(changeHandler);
    return () => {
      CollectionsStore.removeChangeListener(changeHandler);
    };
  }, [props.collectionId]);

  const handleInputChange = (newInput: string) => {
    setInputText(newInput);
  };

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      content={
        <TextField
          onChange={(e) => handleInputChange(e.target.value)}
          autoFocus
          margin="dense"
          id="collectionName"
          label="Nazwa kolekcji"
          type="email"
          placeholder={collection?.name}
          fullWidth
        />
      }
      actions={
        <Button
          disabled={inputText.length === 0 || inputText === collection?.name}
          onClick={() => {
            updateCollection(props.collectionId, createCollectionUpdateData());
            props.toggleDialogOpen();
          }}
          color="primary"
          autoFocus
        >
          Save changes
        </Button>
      }
    />
  );
}
