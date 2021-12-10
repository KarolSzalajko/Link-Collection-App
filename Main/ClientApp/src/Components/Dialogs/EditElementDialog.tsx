import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { updateElement } from "../../Actions/ElementActions";
import { Element, ElementUpdateData } from "../../Model/Element";
import SimpleDialog from "./SimpleDialog";

type EditElementDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  element: Element;
};

export default function EditElementDialog(props: EditElementDialogProps) {
  const title = "Edytuj element";
  const description = "Zmień nazwę, adres url lub opis tego elementu.";
  let [element, setElement] = useState<Element>(props.element);
  const [inputName, setInputName] = React.useState(props.element.name);
  const [inputUrl, setInputUrl] = React.useState(props.element.link);
  const [inputDescription, setInputDescription] = React.useState(props.element.link);

  const createElementUpdateData = () => {
    return {
      name: inputName.length === 0 ? element?.name : inputName,
      link: inputUrl.length === 0 ? element?.link : inputUrl,
      description: inputDescription.length === 0 ? element?.description : inputDescription,
    } as ElementUpdateData;
  };

  useEffect(() => {
    setElement(props.element);
    setInputName(props.element.name);
    setInputUrl(props.element.link);
  }, [props.element]);

  const handleInputNameChange = (newInput: string) => {
    setInputName(newInput);
  };

  const handleInputUrlChange = (newInput: string) => {
    setInputUrl(newInput);
  };

  const handleInputDescriptionChange = (newInput: string) => {
    setInputDescription(newInput);
  };

  const saveChangesEnabled =
    (inputName.length !== 0 && inputName !== element.name) ||
    (inputUrl.length !== 0 && inputUrl !== element.link) ||
    (inputDescription.length !== 0 && inputDescription !== element.description);

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      content={
        <>
          <TextField
            defaultValue={element.name}
            onChange={(e) => handleInputNameChange(e.target.value)}
            autoFocus
            margin="dense"
            id="elementName"
            label="Nazwa elementu"
            type="email"
            placeholder={element.name}
            fullWidth
          />
          <TextField
            defaultValue={element.link}
            onChange={(e) => handleInputUrlChange(e.target.value)}
            margin="dense"
            id="elementUrl"
            label="Url"
            type="email"
            placeholder={element.link}
            fullWidth
          />
          <TextField
            defaultValue={element.description}
            onChange={(e) => handleInputDescriptionChange(e.target.value)}
            margin="dense"
            id="elementDescription"
            label="Opis"
            type="text"
            placeholder={element.description}
            fullWidth
          />
        </>
      }
      actions={
        <Button
          disabled={!saveChangesEnabled}
          onClick={() => {
            updateElement(
              props.element.collectionId,
              props.element.id,
              createElementUpdateData()
            );
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
